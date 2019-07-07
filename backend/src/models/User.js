const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    createIndexes: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
});

const user = mongoose.model('User', userSchema);

module.exports = user;
