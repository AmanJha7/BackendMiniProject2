const Confess = require('../models/confess');

exports.addConfess = async (to, msg, by) => {
    let confess;

    // Find the confess by the 'by' user
    const existingConfess = await Confess.findOne({ by: by });

    if (existingConfess) {
        // If confess already exists, append data
        existingConfess.to.push(to);
        existingConfess.msg.push(msg);
        await existingConfess.save();
        confess = existingConfess;
    } else {
        // If confess does not exist, create a new one
        confess = new Confess({
            to: [to],
            msg: [msg],
            by: by
        });
        await confess.save();
    }

    return confess;
};
