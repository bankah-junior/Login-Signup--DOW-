const express = require('express');
const routes = express.Router();
const userControllers = require('../controller/controllers');

routes.get('/', userControllers.welcome_page);

routes.get('/login', userControllers.log_in);

routes.get('/signup', userControllers.sign_up);

routes.get('/home', userControllers.home_page);

routes.post('/signup', userControllers.signup_register);

routes.post('/login', userControllers.login_authenticate);

routes.get('/logout', userControllers.logout);

module.exports = routes;