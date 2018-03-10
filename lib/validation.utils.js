module.exports.createMiddlewateValidation = (schema) => (req, res, next) => {
  const validation = joi.validate(schema, req.body);
  if (validation.error) {
    return next(
      ApiError(validation.error.message, 400, validation.error.details),
    );
  }
  next();
};
