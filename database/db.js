require('dotenv').config()
const mongoose = require('mongoose');

// let mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.5gryi.mongodb.net/Tricket?retryWrites=true&w=majority`;
let mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.5gryi.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoDB);  

exports.db = mongoose.connection;
