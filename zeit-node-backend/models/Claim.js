const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  content: Buffer
});

const PersonSchema = new mongoose.Schema({
  phone: {
    type: String,
    maxlength: 20
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  birthdate: Date,
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  address: {
    type: String,
    maxlength: 50
  },
  citizenship: String
});

const ClaimSchema = new mongoose.Schema({
  victim: PersonSchema,
  suspect: PersonSchema,
  payment: {
    iban: String,
    sort: String
  },
  information: { type: String, maxlength: 500 },
  evidence: [ImageSchema],
  status: {
    type: String,
    enum: ['pending', 'won', 'lost'],
    default: 'pending'
  },
  paid: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Claim', ClaimSchema);
