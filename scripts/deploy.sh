echo "🚀 Starting deployment..."

cd /home/achraf/hydro-pulse

echo "📦 Pulling latest changes..."
git pull

echo "🐳 Building Docker images..."
docker-compose -f docker-compose.prod.yml build

echo "🛑 Stopping old containers..."
docker-compose -f docker-compose.prod.yml down

echo "🚀 Starting new containers..."
docker-compose -f docker-compose.prod.yml up -d

echo "🗑️ Cleaning up old images..."
docker system prune -f

echo "✅ Deployment completed successfully!"