#!/bin/bash

# LMS VPS Setup Script
# Run this on your Hostinger VPS (Ubuntu) as root or sudo user

set -e

echo "🚀 Starting LMS VPS Setup..."

# 1. Update System
echo "🔄 Updating system packages..."
apt update && apt upgrade -y

# 2. Install Essential Tools
echo "🛠 Installing essential tools..."
apt install -y curl git build-essential ufw fail2ban nginx postgresql postgresql-contrib

# 3. Setup Firewall
echo "🔥 Configuring Firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# 4. Install Node.js via NVM
echo "🟢 Installing Node.js via NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18
nvm alias default 18

# 5. Install PM2
echo "📦 Installing PM2..."
npm install -g pm2

# 6. Setup PostgreSQL Databases
echo "🐘 Configuring PostgreSQL..."
sudo -u postgres psql -c "CREATE DATABASE authdb;" || echo "authdb already exists"
sudo -u postgres psql -c "CREATE DATABASE lmsdb;" || echo "lmsdb already exists"
sudo -u postgres psql -c "CREATE USER lms_user WITH PASSWORD 'ChangeMe123!';" || echo "User already exists"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE authdb TO lms_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE lmsdb TO lms_user;"

# 7. Create App Directory
echo "📁 Preparing application directory..."
mkdir -p /var/www/lms
chown -R $USER:$USER /var/www/lms

# 8. Install Netdata (Monitoring)
echo "📊 Installing Netdata Monitoring..."
bash <(curl -Ss https://my-netdata.io/kickstart.sh) --dont-wait

echo "✅ Setup complete!"
echo "Next steps:"
echo "1. Clone your repository to /var/www/lms"
echo "2. Copy your .env files"
echo "3. Run 'npm install && npm run build'"
echo "4. Use PM2 to start your apps"
