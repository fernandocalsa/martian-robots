require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser")

const postRobots = require("./controllers/post-robots");

const API_PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

app.post("/", postRobots);

app.listen(API_PORT, () => console.log(`server listening at ${API_PORT}`));
