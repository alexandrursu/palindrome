FROM node:8.12.0-alpine

RUN mkdir -p /client

WORKDIR /client

COPY package.json /client

RUN npm install

COPY . /client

CMD ["npm", "start"]