let path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');

let mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.5gryi.mongodb.net/Tricket?retryWrites=true&w=majority`;

mongoose.connect(mongoDB);

exports.db = mongoose.connection;
