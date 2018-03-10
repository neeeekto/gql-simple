const mongoose = require('mongoose');
const schema = require('./schema');
const GQLTypes = require('./graphql.model');
const KEY = 'user';

const exp = {
  GQLTypes,
  UserORM: mongoose.model(KEY, schema),
  KEY,
};

module.exports = exp;