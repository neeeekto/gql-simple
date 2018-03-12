const { ApiError } = require('../lib/errors');

module.exports.apiErrorHandler = function(err, req, res, next) {
  let code = 500;
  switch (err.constructor) {
    case ApiError: {
      code = err.apiCode;
    }
  }
  console.log('Error', err);
  res.status(code).json({
    success: false,
    error: {
      name: err.name || 'Unknow error',
      message: err.message || 'Unknow error',
      meta: err.meta,
    },
  });
};
