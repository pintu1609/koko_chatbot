const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/middleware/db.js");

const routes = require("./src/route/index.js");
const { useErrorHandler } = require("./src/middleware/error-handler.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use(db.connectToDatabase);

app.use("/api/v1/", routes);

const server = http.createServer(app);
const portNumber = process.env.PORT || 5000;

server.listen(portNumber, (err) => {
  console.log("portNumber ", process.env.PORT);
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port ${portNumber}`);
  }
});

app.use(useErrorHandler);
