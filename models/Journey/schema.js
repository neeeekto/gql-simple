const { Schema } = require('mongoose');
const Article = require('../Article');
const User = require('../User');

module.exports = new Schema({
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: Article.KEY,
    },
  ],
  articles: [
    {
      type: Schema.Types.ObjectId,
      required: Article.KEY,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});
