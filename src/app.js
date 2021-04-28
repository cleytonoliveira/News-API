const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

app.use(helmet());
app.use(bodyParser.json());

module.exports = app;
