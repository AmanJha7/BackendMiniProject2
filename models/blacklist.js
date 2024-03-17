const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    reason: { type: String },
    by: { type: String, required: true},
});

module.exports = mongoose.model('Blacklist', blacklistSchema);
