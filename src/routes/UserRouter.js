const { Router } = require('express');
const rescue = require('express-rescue');

const { UserController } = require('../controllers');
const { validateFields } = require('../middlewares');

const UserRouter = Router();

UserRouter.post('/',
  validateFields,
  rescue(UserController.register));

module.exports = UserRouter;
