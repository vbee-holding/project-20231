FROM node:lts-alpine

WORKDIR /usr/backend

ARG PORT=3003

ENV PORT ${PORT}

# ENV NODE_ENV=production

EXPOSE ${PORT}

COPY package.json .

RUN npm --force install

COPY . .

CMD ["npm","start"]
