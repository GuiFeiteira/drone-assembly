const mongoose = require('mongoose');

const pecasSchema0 = new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('pecas', pecasSchema0);