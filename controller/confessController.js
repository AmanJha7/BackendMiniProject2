const confessService = require('../services/confessService');

exports.addConfess = async (req, res) => {
    const { to, msg } = req.body;
    const by = req.user.userId;

    try {
        const confess = await confessService.addConfess(to, msg, by);
        res.status(201).json({ message: "Confess added successfully", confess });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
