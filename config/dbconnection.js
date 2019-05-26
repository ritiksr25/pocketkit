const mongoose = require('mongoose');

require('dotenv').config();

//Connection string
const dburl = process.env.MONGO_URI;
//map global promise
mongoose.Promise = global.Promise;
//Database connection
mongoose.connect(dburl, { useNewUrlParser: true })
    .then(() => { console.log('MongoDB Connected Successfully.') })
    .catch(err => console.log(`Error in MongoDB Connectivity: ${err}`));