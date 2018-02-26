const {model} = require('mongoose');
const schema = require('./schema')
module.exports.KEY = 'journey';
module.exports.JourneyORM = model(schema, module.exports.KEY);
