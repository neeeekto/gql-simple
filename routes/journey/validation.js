const { ApiError, ErrorBase } = require('../../lib/errors');
const { createMiddlewateValidation } = require('../../lib/validation.utils');
const { UserORM, Roles } = require('../../models/User');
const { ArticleORM } = require('../../models/Article');
const joi = require('joi');

const schema = joi.object({
  description: joi.string(),
  name: joi.string().required(),
  authors: joi
    .array()
    .items(joi.string().min(24))
    .min(1),
  articles: joi
    .array()
    .items(joi.string().min(24))
    .min(1),
});
const journeyBaseVMW = createMiddlewateValidation(schema);

const journeyAuthorsValidator = async (authors) => {
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

const journeyAuthorsVMW = async (req, res, next) => {
  const { authors } = req.body;
  try {
    await journeyAuthorsValidator(authors);
    next();
  } catch (error) {
    if (error.name === 'VError') {
      return next(new ApiError(error.name, 400));
    } else {
      return next(error);
    }
  }
};

const journeyArticlesValidator = async (articles) => {
  const articleList = await ArticleORM.find({ _id: { $in: articles } }).exec();
  if (articleList.length === 0 || articleList.length !== articleList.length) {
    throw new ErrorBase(
      `Article not exist: ${authors.filter(
        (el) => articleList.indexOf((a) => a._id === el) === -1,
      )}`,
      'VError',
    );
  }
};

const journeyArticlesVMW = () => async (req, res, next) => {
  const { moderator } = req.body;
  try {
    await journeyArticlesValidator(moderator);
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

module.exports.journeyBaseVMW = journeyBaseVMW;
module.exports.journeyAuthorsValidator = journeyAuthorsValidator;
module.exports.journeyAuthorsVMW = journeyAuthorsVMW;
module.exports.journeyArticlesValidator = journeyArticlesValidator;
module.exports.journeyArticlesVMW = journeyArticlesVMW;
