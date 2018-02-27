var express = require('express');
const userRouter = require('./user');
var router = express.Router();

router.use('/user', userRouter);

module.exports.setRoutes = (app) => {
  app.use(router);
};
