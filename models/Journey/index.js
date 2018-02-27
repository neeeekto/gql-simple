const mongoose = require('mongoose');
const schema = require('./schema');
module.exports.KEY = 'journey';
module.exports.JourneyORM = mongoose.model(module.exports.KEY, schema);
