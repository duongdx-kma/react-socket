# 1. dev mode
docker-compose -f react-docker-compose-dev.yml up --build

# 2. production mode
docker-compose -f docker-compose.yml up --build -d