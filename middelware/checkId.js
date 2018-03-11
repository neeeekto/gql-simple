const mongoose = require('mongoose');
const { ApiError } = require('../lib/errors');

module.exports.checkIDMiddelware = (req, res, next) => {
  let id;
  if (req.body && req.body.id) {
    id = req.body.id;
  }
  if (req.params && req.params.id) {
    id = req.params.id;
  }
  console.log('test', mongoose.Types.ObjectId.isValid(id), id, req.params);
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError('ID is not valid', 400));
  }
  next();
};
