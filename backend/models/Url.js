const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    clickCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Url', urlSchema);
