const express = require('express');
const router = express.Router();
const { UserORM } = require('../../models');
/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await UserORM.find();
  res.json(users);
});

router.get('/:id', async (req, res, next) => {
  const user = await UserORM.findById(req.params.id);
  res.json(user);
});

router.post('/', async (req, res, next) => {
  const user = req.body;
  let newUser = new UserORM(user);
  newUser = await newUser.save();
  res.json(newUser);
})


module.exports = router;
