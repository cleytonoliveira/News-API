const { Router } = require('express');
const rescue = require('express-rescue');

const {
  AuthorController,
  // ArticleController
} = require('../controllers');
const { authentication } = require('../middlewares');

const AdminRouter = Router();

// AdminRouter.get('/authors',
//   authentication,
//   rescue(AuthorController.findAll));
// AdminRouter.get('/authors/:id',
//   authentication,
//   rescue(AuthorController.findById));
AdminRouter.post('/authors',
  authentication,
  rescue(AuthorController.register));
// AdminRouter.put('/authors/:id',
//   authentication,
//   rescue(AuthorController.update));
// AdminRouter.delete('/authors/:id',
//   authentication,
//   rescue(AuthorController.remove));

// AdminRouter.get('/articles',
//   authentication,
//   rescue(ArticleController.findAll));
// AdminRouter.get('/articles/:id',
//   authentication,
//   rescue(ArticleController.findById));
// AdminRouter.post('/articles',
//   authentication,
//   rescue(ArticleController.register));
// AdminRouter.put('/articles/:id',
//   authentication,
//   rescue(ArticleController.update));
// AdminRouter.delete('/articles/:id',
//   authentication,
//   rescue(ArticleController.remove));

module.exports = AdminRouter;
