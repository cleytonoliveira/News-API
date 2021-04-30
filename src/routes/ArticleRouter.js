const { Router } = require('express');
const rescue = require('express-rescue');

const { ArticleController } = require('../controllers');

const ArticleRouter = Router();

ArticleRouter.get('/', rescue(ArticleController));
ArticleRouter.get('/:id', rescue(ArticleController));

module.exports = ArticleRouter;
