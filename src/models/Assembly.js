const mongoose = require('mongoose');
const Peças = require('./Peças');

const assemblySchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Peças: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Peças', required: true }],
    assemblyDate: { type: Date, required: true },
}, { timestamps: true });

const Assembly = mongoose.model('Assembly', assemblySchema);
module.exports = Assembly;

module.exports = mongoose.model('Assembly', assemblySchema);