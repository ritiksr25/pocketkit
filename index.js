//import packages
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

//setting express
const app = express();

//middlewares
app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

//configurations
require('./config/dbconnection');
require('./config/passport')(passport);

//global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

//models
const User = require('./models/User');
const Blog = require('./models/Blog');
const Library = require('./models/Library');

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));
app.use('/news', require('./routes/news'));
app.use('/books', require('./routes/books'));
app.use('/contests', require('./routes/contests'));
app.use('/blogs', require('./routes/blogs'));

//404 route
app.get('*', require('./controllers/index_controller').notfound);

//setting up server
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if (err) console.log('Error in running Server.');
    else console.log(`Server is up and running on Port ${PORT}`);
});