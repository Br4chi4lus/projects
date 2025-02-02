## Table of contents
* [About the project](#About-the-project)
* [Technologies](#Technologies)
* [Setup](#Setup)

## About the project
Simple REST API and frontend that helps managing projects and tasks.
## Technologies
* Backend is created with nestjs and prisma(ORM)
* Frontend is created with nextjs - React framework
* Docker
## Setup
Clone this repository:
```
git clone https://github.com/Br4chi4lus/projects.git
```
### Backend:
Run docker containers:
```
cd projects
docker build -t tasks .
docker compose up
```
At first the app container will stop. You need to update database(do not stop db container):
```
cd nestjs
```
Windows CMD:
```
set DATABASE_URL=postgresql://postgres:password@localhost:5432/tasks && npx prisma migrate dev
```
Linux:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/tasks" npx prisma migrate dev --name init
```
npm run seed
```
And run app container(docker desktop) or stop all containers and:
```
docker compose up
```
once again.
### Frontend:
```
npm run dev
```
To change role of first user you need to use pgadmin. Credentials are in docker-compose.yml file. Connecting to database with pgAdmin in given docker-compose.yml:
* Host - db
* user - postgres
* password - password
