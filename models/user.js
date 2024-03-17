const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    profilePhoto: { type: String },
    interestedIn: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
});

module.exports = mongoose.model('user', signupSchema);
