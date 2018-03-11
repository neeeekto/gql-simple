const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const roles = {
  admin: 'admin',
  user: 'user',
};

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.keys(roles),
    default: roles.user,
  },
});

schema.statics.roles = roles;

schema.method('checkPassword', async function(candidate) {
  try {
    const { password } = this;
    return await bcrypt.compare(candidate, password);
  } catch (error) {
    throw error;
  }
});

schema.pre('save', async function(next) {
  const user = this;
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(user.password, salt);
  next();
});

schema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});

module.exports.schema = schema;
module.exports.roles = roles;
