// models/Question.js

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // ... other fields related to the question
});

module.exports = mongoose.model('Question', questionSchema);
