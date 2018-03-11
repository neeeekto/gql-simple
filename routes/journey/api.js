const express = require('express');
const router = express.Router();
const { Article, User, Journey } = require('../../models');
const validation = require('./validation');
const { checkIDMiddelware } = require('../../middelware/checkId');

const { JourneyORM } = Journey;
router.get('/', async (req, res, next) => {
  const data = await JourneyORM.find()
    .populate('articles')
    .populate('authors');
  res.json(data);
});

router.get('/:id', checkIDMiddelware, async (req, res, next) => {
  try {
    const journey = await JourneyORM.findById(String(req.params.id))
      .populate('articles')
      .populate('authors');
    if (!journey) {
      return next(new ApiError('Not found', 404));
    }
    res.json(journey);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    let newModel = new JourneyORM(data);
    newModel = await newModel.save();
    res.json(newModel);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', checkIDMiddelware, async (req, res, next) => {
  try {
    await JourneyORM.findByIdAndRemove(req.params.id);
    res.json();
  } catch (error) {
    next(error);
  }
});

router.put('/:id', checkIDMiddelware, async (req, res, next) => {
  try {
    const newData = req.body;
    const journey = await JourneyORM.findById(req.params.id);
    Object.assign(journey, newData);
    await journey.save();
    return res.json(journey);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
