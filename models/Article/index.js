const mongoose = require('mongoose');
const schema = require('./schema');
module.exports.KEY = 'article';
module.exports.ArticleORM = mongoose.model(module.exports.KEY, schema);
