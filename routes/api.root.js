const express = require('express');
const route = express.Router();
const { apiErrorHandler } = require('../middelware/apiError');

const { UserController } = require('./user');

route.use('/user', UserController.api);

route.use(apiErrorHandler);

module.exports.apiRoute = route;
