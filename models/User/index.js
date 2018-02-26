const { model } = require('mongoose');
const schema = require('./schema');
module.exports.KEY = 'user';
module.exports.UserORM = model(schema, module.exports.KEY);
