const express = require('express');
const router = express.Router();

const userRouter = require('./user');

route.use('/user', userRouter);

module.exports.apiRoute = route;