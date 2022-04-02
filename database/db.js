const mongoose = require('mongoose');

let mongoDB = `mongodb+srv://gustavocs:admin@cluster0.5gryi.mongodb.net/Tricket?retryWrites=true&w=majority`;

mongoose.connect(mongoDB);

exports.db = mongoose.connection;
