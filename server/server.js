const fs = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/messages");
const [major, minor] = process.versions.node.split(".").map(parseFloat);

/**
 * Swagger related configurations.
 * While server is running Swagger documentation can be accessed
 * at following route http://{host}:{port}/api-docs/
 */
const expressSwagger = require("express-swagger-generator")(app);
const options = {
  swaggerDefinition: {
    info: {
      description: "Swagger API Documentation",
      title: "Swagger",
      version: "1.0.0"
    },
    host: "localhost:3001",
    basePath: "/",
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"]
  },
  basedir: __dirname, //app absolute path
  files: ["./routes/**/*.js"] //Path to the API handle folder
};
expressSwagger(options);

// Cross domain configuration
let allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

// import environmental variables from our variables.env file and handle missing files
if (fs.existsSync("./variables.env")) {
  require("dotenv").config({ path: "variables.env" });
} else {
  console.log("🚫 .env database configuration file is missing");
  process.exit();
}

// Connect to our Database and handle any bad connections
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true }
);

// Tell Mongoose to use ES6 promises
mongoose.Promise = global.Promise;

mongoose.connection.on("error", err => {
  console.error(`${err.message}`);
});

mongoose.connection.on("connected", err => {
  console.log(`Connected to database`);
});

// Make sure we are running node 7.6+
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(
    `🚫 You're on an older version of node that doesn't support all ES6 features. Please go to nodejs.org and download version 7.6 or greater.`
  );
  process.exit();
}

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start server
app.use(allowCrossDomain);
app.use("/", router);

app.listen(3001, () => console.log("Server is listening on port 3001"));
