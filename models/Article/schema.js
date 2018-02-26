const { Schema } = require('mongoose');
const User = require('../User');
module.exports = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: User.KEY,
    },
  ],
  text: {
    type: String,
    required: true,
  },
});
