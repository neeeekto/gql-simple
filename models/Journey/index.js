const mongoose = require('mongoose');
const schema = require('./schema');
const GQLTypes = require('./graphql.model');
const KEY = 'journey';

module.exports = {
  GQLTypes,
  JourneyORM: mongoose.model(KEY, schema),
  KEY,
};
