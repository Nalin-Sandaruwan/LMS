#!/bin/bash

# LMS Database Backup Script
# Automatically dumps authdb and lmsdb

BACKUP_DIR="/var/backups/postgres/lms"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
RETENTION_DAYS=7

mkdir -p $BACKUP_DIR

echo "📦 Starting database backup at $DATE..."

# Backup authdb
pg_dump -U postgres authdb | gzip > $BACKUP_DIR/authdb_$DATE.sql.gz
# Backup lmsdb
pg_dump -U postgres lmsdb | gzip > $BACKUP_DIR/lmsdb_$DATE.sql.gz

echo "✅ Backups completed."

# Remove old backups
echo "🧹 Cleaning up backups older than $RETENTION_DAYS days..."
find $BACKUP_DIR -type f -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "✨ Done."
