# LMS Post-Deployment Best Practices Guide

Congratulations on setting up your VPS! Deploying is only the first step. To maintain a professional, secure, and highly available LMS, follow these best practices.

## Phase 1: Immediate Security & Reliability (The "Must-Haves")

### 1. Enable SSL (HTTPS)
Never run a production LMS over HTTP. It exposes user credentials.
- **Action**: Run `sudo certbot --nginx -d yourdomain.com`.
- **Why**: Protects data in transit and is required for many modern browser features.

### 2. Configure Database Backups
Data loss is the #1 killer of small projects.
- **Action**: Schedule the `scripts/db-backup.sh` using Cron.
  ```bash
  crontab -e
  # Add this line to run every day at 3 AM:
  0 3 * * * /var/www/lms/scripts/db-backup.sh >> /var/log/lms-backup.log 2>&1
  ```
- **Best Practice**: Sync these backups to an off-site location (Google Drive, AWS S3, or Dropbox).

### 3. Monitoring & Alerts
Don't wait for users to tell you the site is down.
- **System**: You already have **Netdata** installed. Access it at `your_ip:19999`.
- **Uptime**: Use a free service like **Uptime Robot** or **Better Stack** to ping your domain every 5 minutes.
- **Logs**: Use `pm2 logs` to see real-time errors. Set up log rotation to avoid filling up the disk:
  ```bash
  pm2 install pm2-logrotate
  ```

---

## Phase 2: Professional Workflow (CI/CD)

### 4. Continuous Deployment (GitHub Actions)
Manually SSH-ing and pulling code is error-prone.
- **Action**: Create a GitHub Action that:
  1. SSHs into your VPS.
  2. Pulls the latest code.
  3. Runs `npm install && npm run build`.
  4. Runs `pm2 restart ecosystem.config.js`.
- **Benefit**: "Zero-downtime" or "Single-click" deployments.

---

## Phase 3: Advanced Security

### 5. API Gateway Protection
- **CORS**: Ensure your `api-gateway` only accepts requests from your specific domain.
- **Rate Limiting**: Implement rate limiting in your NestJS API Gateway to prevent DDoS attacks.
- **Security Headers**: Use the `helmet` middleware in your backend apps.

### 6. SSH Key Only Access
- **Action**: Disable password-based SSH login.
- **Why**: Prevents 99% of automated brute-force attacks.
- **Warning**: Ensure you have your SSH key working before disabling passwords!

---

## Phase 4: Maintenance Checklist (Monthly)

- [ ] **System Updates**: Run `sudo apt update && sudo apt upgrade`.
- [ ] **Dependency Audit**: Run `npm audit` to check for security vulnerabilities in your libraries.
- [ ] **Backup Check**: Periodically try to "restore" a backup to a local machine to ensure the backup files actually work.
- [ ] **Disk Usage**: Check if logs or old builds are filling up space (`df -h`).

## Important Note on Your Domain
Since you are using **path-based routing** (`/admin`, `/teacher`), ensure your frontend applications are always built with the correct `basePath`. If you add a new service, remember to update both the **Nginx config** and the **API Gateway proxy rules**.
