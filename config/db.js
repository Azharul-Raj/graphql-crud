const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    mongoose.set('strictQuery', false);
    const connected = await mongoose.connect(process.env.MONGO_URL);
    console.log(`DATABASE CONNECTED AT ${connected.connection.host}`)
}

module.exports = connectDB;