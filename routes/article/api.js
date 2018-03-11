const express = require('express');
const router = express.Router();
const { Article } = require('../../models');
const validation = require('./validation');
const { checkIDMiddelware } = require('../../middelware/checkId');

const { ArticleORM } = Article;
/* GET users listing. */
router.get('/', async (req, res, next) => {
  const data = await ArticleORM.find();
  res.json(data);
});

router.get('/:id', checkIDMiddelware, async (req, res, next) => {
  try {
    const article = await ArticleORM.findById(String(req.params.id));
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
  validation.articleBaseValidation,
  validation.articleAuthorsValidation,
  validation.articleModeratorValidation,
  async (req, res, next) => {
    try {
      const data = req.body;
      let newModel = new ArticleORM(user);
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
  validation.articleBaseValidation,
  validation.articleAuthorsValidation,
  validation.articleModeratorValidation,
  validation.userValidation(),
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
