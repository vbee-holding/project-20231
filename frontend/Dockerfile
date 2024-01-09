FROM node:lts-alpine

WORKDIR /usr/frontend

ARG PORT=3000

ENV PORT ${PORT}

EXPOSE ${PORT}

COPY package.json .

RUN npm install

RUN npm install next

COPY . .

CMD ["npm","run","dev"]