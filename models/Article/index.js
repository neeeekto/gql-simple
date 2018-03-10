const mongoose = require('mongoose');
const schema = require('./schema');
const GQLTypes = require('./graphql.types');
module.exports.KEY = 'article';
module.exports.ArticleORM = mongoose.model(module.exports.KEY, schema);
module.exports.GQLTypes = GQLTypes;
