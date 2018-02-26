const {Schema} = require('mongoose')
const {USER_KEY} = require('../User')
module.exports = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: USER_KEY
  }],
  text: {
    type: String,
    required: true
  },
  
})