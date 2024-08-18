const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
  dateOfHire: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { collection: 'employees' });

module.exports = mongoose.model('Employee', EmployeeSchema);
