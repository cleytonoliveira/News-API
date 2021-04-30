const { Router } = require('express');
const rescue = require('express-rescue');

const { UserController } = require('../controllers');
const { validateUserFields } = require('../middlewares');

const UserRouter = Router();

UserRouter.post('/',
  validateUserFields,
  rescue(UserController.register));

module.exports = UserRouter;
