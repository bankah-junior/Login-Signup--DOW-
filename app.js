const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const userRoutes = require('./routes/routes');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

// Passport config
require('./config/passport')(passport);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));

// middleware for the post request
app.use(express.urlencoded({ extended : true }));

// Express Session
app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use(userRoutes);

// Connecting database 
const dbURI = 'mongodb://localhost:27017/users';
async function connect() {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}
connect();
