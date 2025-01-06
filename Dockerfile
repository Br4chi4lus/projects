FROM node:22.11.0-alpine3.20

WORKDIR /app


COPY /nestjs/package.json /nestjs/package-lock.json ./

RUN npm install

COPY nestjs /app

RUN npx prisma generate

RUN npm run build

CMD [ "npm", "run", "start" ]