FROM node:lts-alpine3.17

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]