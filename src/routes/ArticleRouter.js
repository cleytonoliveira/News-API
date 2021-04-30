const { Router } = require('express');
const rescue = require('express-rescue');

const { ArticleController } = require('../controllers');
const { authAnonymous } = require('../middlewares');

const ArticleRouter = Router();

ArticleRouter.get('/', rescue(ArticleController));
ArticleRouter.get('/:id', authAnonymous, rescue(ArticleController.findByIdAnonymous));

module.exports = ArticleRouter;
