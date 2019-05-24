//import packages
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');

//setting express
const app = express();

//middlewares
app.set('view engine', ejs);
app.set(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurations
require('dotenv').config();
require('./config/dbconnection');
require('./config/passport');

//routes
app.use('/', require('./routes/index'));
//app.use('/users', require('./routes/users'));
//app.use('/movies', requie('./routes/movies'));
//app.use('/news', require('./routes/news'));
//app.use('/books', require('./routes/books'));
//app.use('/contests', require('./routes/contests'));
//app.use('/blogs', require('./routes/blogs'));

//setting up server
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if(err) console.log('Error in running Server.');
    else console.log(`Server is up and running on Port ${PORT}`);
});