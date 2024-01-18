FROM node:lts-alpine

WORKDIR /usr/cuong2905say/frontend

ARG PORT=3000

ENV PORT ${PORT}

ENV NODE_ENV=production

EXPOSE ${PORT}

COPY package.json .

# force to install sharp
# RUN chown root.root . 

RUN npm install

RUN npm install next

COPY . .

CMD ["npm","run","dev"]