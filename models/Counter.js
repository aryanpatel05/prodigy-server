const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  sequenceValue: {
    type: Number,
    required: true
  }
}, { collection: 'counters' });

module.exports = mongoose.model('Counter', CounterSchema);
