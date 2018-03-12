const joi = require('joi');
const { ApiError } = require('./errors');

module.exports.createMiddlewateValidation = (schema) => (req, res, next) => {
  const validation = joi.validate(req.body, schema);
  if (validation.error) {
    return next(
      new ApiError(validation.error.message, 400, validation.error.details),
    );
  }
  next();
};
