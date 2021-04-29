const { Router } = require('express');
const rescue = require('express-rescue');

const { UserController } = require('../controllers');

const UserRouter = Router();

UserRouter.post('/', rescue(UserController.register));

module.exports = UserRouter;
