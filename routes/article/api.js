const express = require('express');
const router = express.Router();
const { Article, User } = require('../../models');
const validation = require('./validation');
const { checkIDMiddelware } = require('../../middelware/checkId');

const { ArticleORM } = Article;
router.get('/', async (req, res, next) => {
  const data = await ArticleORM.find()
    .populate('moderator')
    .populate('authors');
  res.json(data);
});

router.get('/:id', checkIDMiddelware, async (req, res, next) => {
  try {
    const article = await ArticleORM.findById(String(req.params.id))
      .populate('moderator')
      .populate('authors');
    if (!article) {
      return next(new ApiError('Not found', 404));
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validation.articleBaseVMW(),
  validation.articleAuthorsVMW,
  validation.articleModeratorVMW,
  async (req, res, next) => {
    try {
      const data = req.body;
      let newModel = new ArticleORM(data);
      newModel = await newModel.save();
      res.json(newModel);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', checkIDMiddelware, async (req, res, next) => {
  try {
    await ArticleORM.findByIdAndRemove(req.params.id);
    res.json();
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  checkIDMiddelware,
  validation.articleBaseVMW(),
  validation.articleAuthorsVMW,
  validation.articleModeratorVMW,
  async (req, res, next) => {
    try {
      const newData = req.body;
      const article = await ArticleORM.findById(req.params.id);
      Object.assign(article, newData);
      await article.save();
      return res.json(article);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
