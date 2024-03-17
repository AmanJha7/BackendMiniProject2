const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function restrictToLoggedinUserOnly(req, res, next) {
    // Check if authToken exists in cookies
    const authToken = req.cookies.authToken;
    if (!authToken) {
        return res.redirect('/auth/login');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        // If token is valid, find the user in the database
        const user = await User.findById(decoded.id);
        if (!user) {
            console.log("User not found");
            return res.redirect('/user/login');
        }

        // Attach the user to the request for further use
        req.user = user;
        req.user._id = decoded.id;
        next();
    } catch (err) {
        console.error(err.message);
        // If token is invalid, redirect to login
        return res.redirect('/user/login');
    }
}

module.exports = restrictToLoggedinUserOnly;
