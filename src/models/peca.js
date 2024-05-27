const mongoose = require('mongoose');

const pieceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assembly: { type: mongoose.Schema.Types.ObjectId, ref: 'montagem' }, // Campo para armazenar a montagem associada
});

module.exports = mongoose.model('pecas', pieceSchema);
