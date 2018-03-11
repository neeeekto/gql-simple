const { Schema } = require('mongoose');
const User = require('../User');
module.exports = new Schema({
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: User.KEY,
    },
  ],
  moderator: {
    type: Schema.Types.ObjectId,
    ref: User.KEY,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
    enum: Object.keys(User.Roles),
  },
});
