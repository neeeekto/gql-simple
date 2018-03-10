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
  });
  return createMiddlewateValidation(userSchema);
};

const userPasswordValidation = (req, res, next) => {
  const userSchema = joi.object({
    password: joi
      .string()
      .min(6)
      .required(),
  });
  return createMiddlewateValidation(userSchema);
};

module.exports.userValidation = userValidation;
