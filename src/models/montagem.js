const mongoose = require('mongoose');

const assemblySchema = new mongoose.Schema({
  drone: { type: mongoose.Schema.Types.ObjectId, ref: 'Drone', required: true },
  pieces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pecas' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
});

module.exports = mongoose.model('montagem', assemblySchema);
