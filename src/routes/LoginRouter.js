const { Router } = require('express');
const rescue = require('express-rescue');

const { LoginController } = require('../controllers');

const LoginRouter = Router();

LoginRouter.post('/', rescue(LoginController.auth));

module.exports = LoginRouter;
