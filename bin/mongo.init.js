const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect('mongodb://127.0.0.1:27017/SFI', (error) => {
  if (error) {
    console.error('Error connect to mongoDb', error);
    process.exit(1);
  }
});
