const express = require('express');
const route = express.Router();
const { apiErrorHandler } = require('../middelware/apiError');

const { UserController } = require('./user');
const { ArticleController } = require('./article');
const { JourneyController } = require('./journey');

route.use('/user', UserController.api);
route.use('/article', ArticleController.api);
route.use('/journey', JourneyController.api);

module.exports.apiRoute = route;
