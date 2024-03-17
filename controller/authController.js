const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Login function
async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // If credentials are valid, create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        // Set cookies with JWT token
        res.cookie('authToken', token, {
            maxAge: 3 * 24 * 60 * 60 * 1000, // Expires in 3 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag based on environment
            sameSite: 'strict' // Set SameSite attribute
        });

        req.user = user;
        res.json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Register function
async function register(req, res) {
    const { username, password, name, age, gender, profilePhoto, interestedIn, email, phone } = req.body;
    const userId = Date.now();

    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user instance
        user = new User({
            userId,
            username,
            password,
            name,
            age,
            gender,
            profilePhoto,
            interestedIn,
            email,
            phone
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to the database
        await user.save();

        // If registration is successful, also log in the user
        const token = jwt.sign({ id: user._id , password: user.password }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.cookie('authToken', token, {
            maxAge: 3 * 24 * 60 * 60 * 1000, // Expires in 3 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag based on environment
            sameSite: 'strict' // Set SameSite attribute
        });

        res.json({ msg: 'User registered and logged in successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const logout = async (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/auth/login');
}

module.exports = {
    login,
    register,
    logout
};
