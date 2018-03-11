const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const { UserORM } = User;
const { ApiError } = require('../../lib/errors');
const { checkIDMiddelware } = require('../../middelware/checkId');

const validation = require('./validation');
/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await UserORM.find();
  res.json(users);
});

router.get('/:id', checkIDMiddelware, async (req, res, next) => {
  try {
    const user = await UserORM.findById(String(req.params.id));
    if (!user) {
      return next(new ApiError('Not found', 404));
    }
    res.json(user);
  } catch (error) {
    return next(error);
  }
});

router.post(
  '/',
  checkIDMiddelware,
  validation.userValidation(),
  async (req, res, next) => {
    try {
      const user = req.body;
      let newUser = new UserORM(user);
      newUser = await newUser.save();
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', checkIDMiddelware, async (req, res, next) => {
  try {
    await UserORM.findByIdAndRemove(req.params.id);
    res.json();
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  checkIDMiddelware,
  validation.userValidation(),
  async (req, res, next) => {
    try {
      const newData = req.body;
      const user = await UserORM.findById(req.params.id);
      Object.assign(user, newData);
      await user.save();
      return res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
