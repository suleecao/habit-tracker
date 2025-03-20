const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  habit : {
    type: String, 
    required: true,
  },
  status: {
    type: String, 
    enum: ['done', 'incomplete'],
    required: true,
  },
  notes: {
    type: String,
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  habits: [habitSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
