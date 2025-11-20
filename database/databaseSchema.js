const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('sorting', schema);