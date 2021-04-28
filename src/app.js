const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');

const routes = require('./main.routes');
const { handleError } = require('./middlewares');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use('/api', routes);
app.use(handleError);

module.exports = app;
