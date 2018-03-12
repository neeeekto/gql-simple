const { ApiError } = require('../../lib/errors');
const { createMiddlewateValidation } = require('../../lib/validation.utils');
const { UserORM } = require('../../models/User');
const joi = require('joi');

const userValidation = () => {
  const userSchema = joi.object({
    name: joi.string().required(),
    login: joi
      .string()
      .min(6)
      .required(),
    role: joi.string().only(Object.keys(UserORM.schema.statics.roles)),
    password: joi.string().min(6),
  });
  return createMiddlewateValidation(userSchema);
};

module.exports.userValidation = userValidation;
