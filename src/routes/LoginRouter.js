const { Router } = require('express');
const { LoginController } = require('../controllers');

const LoginRouter = Router();

LoginRouter.post('/', LoginController.auth);

module.exports = LoginRouter;
