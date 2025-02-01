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
Backend:
```
cd tasks
docker build -t tasks .
docker compose up
cd nestjs
prisma migrate dev
npm run seed
```
Run app container.
Frontend:
```
npm run dev
```
To change role of first user you need to use pgadmin.
