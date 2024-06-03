const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required']},
  type: { type: String, required: [true, 'Type is required'] },
  status: {type: String, enum: ['assembled', 'disassembled', 'in-progress' ], default: 'in-progress'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Drone', droneSchema);
