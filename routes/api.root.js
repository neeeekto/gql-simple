const express = require('express');
const route = express.Router();
const { apiErrorHandler } = require('../middelware/apiError');

const { UserController } = require('./user');
const { ArticleController } = require('./article');

route.use('/user', UserController.api);
route.use('/article', ArticleController.api);

module.exports.apiRoute = route;
