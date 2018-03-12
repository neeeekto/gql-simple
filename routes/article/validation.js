const { ApiError, ErrorBase } = require('../../lib/errors');
const { createMiddlewateValidation } = require('../../lib/validation.utils');
const { UserORM, Roles } = require('../../models/User');
const joi = require('joi');

const articleBaseVMW = () => {
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

const articleAuthorsValidator = async (authors) => {
  const users = await UserORM.find({ _id: { $in: authors } }).exec();
  if (users.length === 0 || users.length !== authors.length) {
    throw new ErrorBase(
      `User not exist: ${authors.filter(
        (el) => users.indexOf((u) => u._id === el) === -1,
      )}`,
      'VError',
    );
  }
};

const articleAuthorsVMW = async (req, res, next) => {
  const { authors } = req.body;
  try {
    await articleAuthorsValidator(authors);
    next();
  } catch (error) {
    if (error.name === 'VError') {
      return next(new ApiError(error.name, 400));
    } else {
      return next(error);
    }
  }
};

const articleModeratorValidator = async (moderatorId) => {
  const users = await UserORM.findById(moderatorId);
  if (!users) {
    throw new ErrorBase(`User not exist: ${moderatorId}`, 'VError');
  }
  if (users.role !== Roles.admin) {
    throw new ErrorBase(`User is not admin: ${moderatorId}`, 'VError');
  }
};

const articleModeratorVMW = () => async (req, res, next) => {
  const { moderator } = req.body;
  try {
    await articleModeratorValidator(moderator);
    next();
  } catch (error) {
    if (error.name === 'VError') {
      return next(new ApiError(error.name, 400));
    } else {
      return next(error);
    }
  }
  next();
};

module.exports.articleBaseVMW = articleBaseVMW;
module.exports.articleAuthorsValidator = articleAuthorsValidator;
module.exports.articleModeratorValidator = articleModeratorValidator;
module.exports.articleAuthorsVMW = articleAuthorsVMW;
module.exports.articleModeratorVMW = articleModeratorVMW;
