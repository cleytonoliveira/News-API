const { Router } = require('express');
const {
  LoginRouter,
  UserRouter,
  AdminRouter,
  ArticleRouter,
} = require('./routes');

const routes = Router();

routes.use('/login', LoginRouter);
routes.use('/sign-up', UserRouter);
routes.use('/admin', AdminRouter);
routes.use('/articles', ArticleRouter);

module.exports = routes;
