BACKUP_DIR="/home/achraf/hydro-pulse/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_PATH="/home/achraf/hydro-pulse/backend/water_app.db"

mkdir -p $BACKUP_DIR

if [ -f "$DB_PATH" ]; then
    cp $DB_PATH "$BACKUP_DIR/water_app_backup_$DATE.db"
    echo "✅ Database backup created: water_app_backup_$DATE.db"
    
    find $BACKUP_DIR -name "*.db" -mtime +30 -delete
    echo "🗑️ Old backups (>30 days) deleted"
else
    echo "❌ Database not found at $DB_PATH"
fi