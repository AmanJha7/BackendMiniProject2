const express = require('express');
const router = express.Router();
const Blacklist = require('../models/blacklist');

// Add user to blacklist
router.post('/', async (req, res) => {
    const { userId, reason } = req.body;
    const by = req.user._id

    try {
        // Check if user already exists in blacklist
        let blacklistedUser = await Blacklist.findOne({ userId , by });
        if (blacklistedUser) {
            return res.status(400).json({ msg: 'User already blacklisted' });
        }

        // Create new blacklisted user instance
        blacklistedUser = new Blacklist({
            userId,
            reason,
            by
        });

        // Save blacklisted user to the database
        await blacklistedUser.save();

        res.json({ msg: 'User added to blacklist successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Remove user from blacklist
router.delete('/:userId', async (req, res) => {
    try {
        const by = req.user._id
        const blacklistedUser = await Blacklist.findOne({ userId: req.params.userId , by });
        if (!blacklistedUser) {
            return res.status(404).json({ msg: 'User not found in blacklist' });
        }

        await Blacklist.findByIdAndRemove(blacklistedUser._id);
        res.json({ msg: 'User removed from blacklist successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
