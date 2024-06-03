const mongoose = require('mongoose');

const montagemSchema = new mongoose.Schema({
    drone: {type: mongoose.Schema.Types.ObjectId, ref: 'Drone', requeired: [true, 'É necessario um drone']},
    pecas: {type: mongoose.Schema.Types.ObjectId, ref: 'pecas', required: [true, 'É necessario uma peça']},
    quantidade: {type: Number, required: [true, 'Quantidade necessaria minima de pelo menos 1 peça'], min: 1 },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    montagem_data: { type: Date, default: Date.now }
},{timestamps: true});

module.exports = mongoose.model('montagem', montagemSchema);