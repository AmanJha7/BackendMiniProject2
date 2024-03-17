const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/signup', (req, res) => {  res.render('signup.ejs');  });

router.get('/login', (req, res) => {   res.render('login.ejs');  });

router.get('/logout', authController.logout);

router.post('/login', authController.login);

router.post('/register', authController.register);

module.exports = router;
