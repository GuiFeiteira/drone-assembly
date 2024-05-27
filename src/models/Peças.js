const mongoose = require('mongoose');

const PeçasSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
}, { timestamps: true });

const Peças = mongoose.model('Peças', partSchema);
module.exports = Peças;

module.exports = mongoose.model('Peças', PeçasSchema);