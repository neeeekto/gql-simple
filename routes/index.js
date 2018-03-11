const express = require('express');
const router = express.Router();

const { apiRoute } = require('./api.root');
const { graphQlRoute } = require('./graphql.root');
const { apiErrorHandler } = require('../middelware/apiError');

router.use('/api', apiRoute, apiErrorHandler);
router.use('/graphql', graphQlRoute);

module.exports.setRoutes = (app) => {
  app.use(router);
};
