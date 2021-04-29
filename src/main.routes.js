const { Router } = require('express');
const { LoginRouter, UserRouter } = require('./routes');

const routes = Router();

routes.use('/login', LoginRouter);
routes.use('/sign-up', UserRouter);

module.exports = routes;
