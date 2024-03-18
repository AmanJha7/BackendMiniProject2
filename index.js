const  { express,bodyParser,restrictToLoggedinUserOnly,authRoutes,postRoutes,notificationRoutes,blacklistRoutes,userRoutes,logmiddleware,cookieParser,path,mongoose,confessRoutes} = require('./importer');
require('dotenv').config()

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(logmiddleware());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(bodyParser.json());

// Use your routes
app.get('/', (req, res) => {
    res.redirect('/users')
})
app.use('/users', restrictToLoggedinUserOnly , userRoutes);
app.use('/blacklist', restrictToLoggedinUserOnly , blacklistRoutes);
app.use('/notification', restrictToLoggedinUserOnly , notificationRoutes)
app.use('/post', restrictToLoggedinUserOnly , postRoutes)
app.use('/confess' , confessRoutes)
app.use('/auth',authRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Db connected.");
})
.catch(err => {
    console.error('Connection error:', err.message);
});

// Port configuration
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
