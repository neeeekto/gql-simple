const express = require('express');
const router = express.Router();

const { apiRoute } = require('./api.root');
const { graphQlRoute } = require('./graphql.root');

router.use('/api', apiRoute);
router.use('/graphql', graphQlRoute);

module.exports.setRoutes = (app) => {
  app.use(router);
};
