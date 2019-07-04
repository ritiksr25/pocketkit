const mongoose = require("mongoose");

require("dotenv").config();

//Connection string
const dburl = process.env.MONGO_URI;
//map global promise
mongoose.Promise = global.Promise;
//Database connection
connectDB = async () => {
    try {
        await mongoose.connect(dburl, { useNewUrlParser: true });
        console.log("MongoDB Connected Successfully.");
    } catch (err) {
        console.log(`Error in MongoDB Connectivity: ${err}`);
    }
};
connectDB();
