FROM node:20-alpine

WORKDIR /usr/frontend

ARG PORT=3000

ENV PORT ${PORT}

ENV NODE_ENV=production

EXPOSE ${PORT}

COPY package.json . 

RUN npm install

COPY . .

RUN npx tailwindcss build src/app/globals.css -o src/app/globals.css --watch

RUN npm run build

CMD ["npm","start"]
