const ErrorBase = class ErrorBase extends Error {
  constructor(messageOrError, name, meta) {
    if (typeof messageOrError === 'object') {
      let error = messageOrError;
      super(error.message);
      this.stack = error.stack;
    } else {
      super(messageOrError);
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error(messageOrError).stack;
      }
    }
    this.name = name || this.constructor.name;
    this.meta = meta;
  }
};

module.exports.ApiError = class ApiError extends ErrorBase {
  constructor(message, apiCode, meta) {
    super(message, 'ApiError', meta);
    this.apiCode = apiCode;
  }
};
