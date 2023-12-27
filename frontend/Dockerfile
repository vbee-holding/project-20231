FROM node:lts-alpine

WORKDIR /usr/frontend

ARG PORT=3000

ENV PORT ${PORT}

EXPOSE ${PORT}

COPY package.json .

RUN npm install

COPY . .