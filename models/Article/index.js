const {model} = require('mongoose');
const schema = require('./schema')
module.exports.KEY = 'article';
module.exports.ArticleORM = model(schema, module.exports.KEY);
