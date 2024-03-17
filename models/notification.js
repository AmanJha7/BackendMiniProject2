const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    from: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, required: true },
});

module.exports = mongoose.model('Notification', notificationSchema);
