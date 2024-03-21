FROM node:latest

WORKDIR /deployment

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]

