# APP LIVE DEMO
Live url:
# Project Architecture.

# Sequence diagram of the use cases' interactions.
![alt text](https://alexandrursu.github.io/palindrome-swagger/new-sequence.png "Add message diagram")
![alt text](https://alexandrursu.github.io/palindrome-swagger/details-sequence.png "Get details diagram")
![alt text](https://alexandrursu.github.io/palindrome-swagger/list-sequence.png "List messages diagram")
![alt text](https://alexandrursu.github.io/palindrome-swagger/delete-sequence.png "Delete message diagram")

# How to: build, deploy and access the app.

# API Documentation
Link to the documentation: https://alexandrursu.github.io/palindrome-swagger/

## Details:
- ['express-swagger-generator'](https://www.npmjs.com/package/express-swagger-generator) was used to generate swagger doc & ui based on express existing routes.
- while server is running open http://<app_host>:<app_port>/api-docs in your browser to view the documentation.
- static HTML version was generated from Swagger schema .json file using https://twskj.github.io/pretty-swag/
