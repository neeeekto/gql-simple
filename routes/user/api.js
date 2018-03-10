const express = require('express');
const router = express.Router();
const { UserORM } = require('../../models');
const validation = require('./validation');
/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await UserORM.find();
  res.json(users);
});

router.get('/:id', async (req, res, next) => {
  const user = await UserORM.findById(req.params.id);
  res.json(user);
});

router.post('/', validation.userValidation(), async (req, res, next) => {
  try {
    const user = req.body;
    let newUser = new UserORM(user);
    newUser = await newUser.save();
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await UserORM.findByIdAndRemove(req.params.id);
    res.json();
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validation.userValidation(), async (req, res, next) => {
  try {
    const newData = req.body;
    const user = await UserORM.findById(req.params.id);
    Object.assign(user, newData);
    await user.save();
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
