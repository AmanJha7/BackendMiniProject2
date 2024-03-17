const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    from: { type: String, required: true },
    time: { type: Date, required: true },
    comments: [{
        by: { type: String, required: true },
        msg: { type: String, required: true },
        time: { type: Date, required: true },
    }],
    visibility: { type: String, required: true },
    likes: [{ by: { type: String, required: true } }],
});

module.exports = mongoose.model('Post', postSchema);
