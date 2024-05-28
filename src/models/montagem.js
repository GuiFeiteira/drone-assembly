const mongoose = require('mongoose');

const montagemSchema = new mongoose.Schema({
    drone: {type: mongoose.Schema.Types.ObjectId, ref: 'Drone', requeired: true},
    pecas: {type: mongoose.Schema.Types.ObjectId, ref: 'pecas', required: true},
    quantidade: {type: Number, required: true, min: 1 },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    data_montagem: {type: Date, required: true },
},{timestamps: true});

module.exports = mongoose.model('montagem', montagemSchema);