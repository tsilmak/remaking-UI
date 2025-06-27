# Twitter-X-Recreation BackEnd

# Local Database
## Use docker-compose.yml to compose the database 
- **Database**: PostgreSQL
- **Username**: user
- **Password**: password
- **Database Name**: Twitter-X-Recreation-DB
- **Port**: 5432

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- Docker running on your system
- SETUP DATABASE USING DOCKER-COMPOSE.YML

## Or paste this into cmd

docker run -d --name twitter-x-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=Twitter-X-Recreation-DB -p 5432:5432 postgres:latest

# Configure the .env (examples on .env.example)
SERVER_PORT=8001

SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/Twitter-X-Recreation-DB
SPRING.DATASOURCE_USERNAME=user
SPRING_DATASOURCE_PASSWORD=password

JPA_HIBERNATE_DDL=create

ORIGIN_BASEURL=http://localhost:3001/ (your frontEnd url)

MY_EMAIL_ADDRESS="your email" - configure your Email to send verification codes - [HERE](./docs/GMAIL_SERVICE/README.md) 
