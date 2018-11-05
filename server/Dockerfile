FROM node:8.12.0-alpine

RUN mkdir -p /server

WORKDIR /server

COPY package.json /server

RUN npm install

COPY . /server

CMD ["npm", "start"]