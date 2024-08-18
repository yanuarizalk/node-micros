FROM node:20.13.1-alpine

ARG SERVICE

WORKDIR /usr/src
COPY app ./app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY services/${SERVICE}/src ./service

EXPOSE 9090 9091 9092
CMD [ "node", "service/server.js" ]