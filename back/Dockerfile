FROM node:8.11-alpine

RUN npm i -g typescript sequelize-cli

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD npm run start:prod
