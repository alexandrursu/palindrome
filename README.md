# APP LIVE DEMO
Live url: [http://thejs.ca/](http://thejs.ca/)

## Project Architecture.
The project is structured as following:
- **CLIENT**: build with **ReactJS** and **Material UI** React components.
- **SERVER**: REST API build using **NodeJS/Express** server.
- **DB**: **MongoDB** is used to store the messages.

## Sequence diagram of the use cases' interactions.
![alt text](https://alexandrursu.github.io/palindrome-swagger/new-sequence.png "Add message diagram")
![alt text](https://alexandrursu.github.io/palindrome-swagger/details-sequence.png "Get details diagram")

![alt text](https://alexandrursu.github.io/palindrome-swagger/list-sequence.png "List messages diagram")
![alt text](https://alexandrursu.github.io/palindrome-swagger/delete-sequence.png "Delete message diagram")

## How to build.
There are 2 options for building current project:
1. **NPM Build**:
- Run `npm install -g concurrently` (helper package that allows to run multiple commands concurrently)
- Run `npm start`

_or_

2. **Docker compose**
- Run `docker-compose up`

In both cases:
- **client** will be served at http://localhost:3000
- **server** will be served at http://localhost:3001

> Note: 
Client is currently configured to use API from `http://api.thejs.ca/messages`, you will have to change API hosting to `localhost:3001/messages` in `clinet/src/constants.js` when you're running project locally. 

## Docker + DigitalOcean
The application is deployed to a Cloud Provider (DigitalOcean) using Docker and DigitalOcean Droplets. 

## MongoDB 
Database is hosted on mLab cloud MongoDB service. Connection url `mongodb://root:Palindrome1@ds125293.mlab.com:25293/palindrome` is stored in `variables.env` file which was committed for *demo purpouse* only. 
In real world scenario this file would be added only on server hosting or configs would be defined in the hosting environment variables.  

## API Documentation
Link to the documentation: https://alexandrursu.github.io/palindrome-swagger/

### Details:
- ['express-swagger-generator'](https://www.npmjs.com/package/express-swagger-generator) was used to generate swagger doc & ui based on express existing routes.
- while server is running open http://<app_host>:<app_port>/api-docs in your browser to view the documentation.
- static HTML version was generated from Swagger schema .json file using https://twskj.github.io/pretty-swag/
