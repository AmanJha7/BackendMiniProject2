const mongoose = require('mongoose');

// Define confess schema
const confessSchema = new mongoose.Schema({
    to: [{ type: String }],
    msg: [{ type: String, required: true, trim: true }],
    by: { type: String , required: true }
});

// Create confess model
const Confess = mongoose.model('Confess', confessSchema);

module.exports = Confess;
