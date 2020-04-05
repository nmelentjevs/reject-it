const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
    unique: true
  },
  confirmationCode: String
});

module.exports = mongoose.model('Email', EmailSchema);
