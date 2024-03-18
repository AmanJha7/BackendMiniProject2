const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logmiddleware = require('./middleware/logindatastorer');
const userRoutes = require('./routes/userRoutes');
const blacklistRoutes = require('./routes/blacklistRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const postRoutes = require('./routes/postRoutes');
const restrictToLoggedinUserOnly = require('./middleware/auth')
const authRoutes = require('./routes/authRoutes')
const confessRoutes = require('./routes/confessRoutes')

module.exports = {
    express,bodyParser,restrictToLoggedinUserOnly,authRoutes,postRoutes,notificationRoutes,blacklistRoutes,
    userRoutes,logmiddleware,cookieParser,path,mongoose,confessRoutes
}
