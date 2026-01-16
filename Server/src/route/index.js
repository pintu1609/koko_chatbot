const express = require("express");
const app = express();
const chat = require("./chat/chat"); 

app.use("/chat", chat);

module.exports = app;