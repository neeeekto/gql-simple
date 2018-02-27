const mongoose = require('mongoose');
const schema = require('./schema');
const KEY = 'user';
module.exports.KEY = KEY;
module.exports.UserORM = mongoose.model(KEY, schema);
