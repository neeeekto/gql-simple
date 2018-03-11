const { ApiError } = require('../../lib/errors');
const { createMiddlewateValidation } = require('../../lib/validation.utils');
const { UserORM, Roles } = require('../../models/User');
const joi = require('joi');

const articleBaseValidation = () => {
  const schema = joi.object({
    title: joi.string().required(),
    text: joi.string().required(),
    permission: joi.string().only(Object.keys(Roles)),
    moderator: joi.string().required(),
    authors: joi
      .array()
      .items(joi.string().min(24))
      .min(1),
  });
  return createMiddlewateValidation(schema);
};

const articleAuthorsValidation = () => async (req, res, next) => {
  const { authors } = req.body;
  const users = await UserORM.find({ $in: { _id: authors } }).exec();
  if (user.length === 0 || user.length !== authors.length) {
    return next(
      new ApiError(
        `User not exist: ${authors.filter(
          (el) => users.indexOf((u) => u._id === el) === -1,
        )}`,
        400,
      ),
    );
  }
  next();
};

const articleModeratorValidation = () => async (req, res, next) => {
  const { moderator } = req.body;
  const users = await UserORM.findById(moderator);
  if (!users) {
    return next(new ApiError(`User not exist: ${moderator}`, 400));
  }
  if (users.role !== Roles.admin) {
    return next(new ApiError(`User is not admin: ${moderator}`, 400));
  }
  next();
};

module.exports.articleBaseValidation = articleBaseValidation;
module.exports.articleAuthorsValidation = articleAuthorsValidation;
module.exports.articleModeratorValidation = articleModeratorValidation;
