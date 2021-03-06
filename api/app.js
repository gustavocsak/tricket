const express = require('express');
const app = express();

let path = require('path');

const { db } = require('../database/db.js');

app.set('json spaces', 40);

app.use(express.static('frontend/public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.on('open', () => {
    console.log('connected to database.');
    const server = app.listen(process.env.PORT || 3000, () => console.log('listening'));
});

const router = require(path.join(__dirname, 'routes/index.js'));
app.use('/api/v1', router);
