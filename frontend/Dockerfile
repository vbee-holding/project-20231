FROM node:lts-alpine

WORKDIR /usr/frontend

ARG PORT=3000

ENV PORT ${PORT}

ENV NODE_ENV=production

EXPOSE ${PORT}

COPY . .

RUN npm install

CMD ["npm","run","dev"]