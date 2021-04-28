const { Router } = require('express');
const { LoginRouter } = require('./routes');

const routes = Router();

routes.use('/login', LoginRouter);

module.exports = routes;
