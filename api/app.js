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
    const server = app.listen(process.env.PORT || 8080, () => console.log('listening'));
});

let dummy = [
    {
        name: 'this is my project',
        id: '1',
        tickets: [
            { title: 'bug in h1', author: 'sopa' },
            { title: 'finish navbar', author: 'carlos' },
            { title: 'start logo', author: 'david' },
        ],
    },
    {
        name: 'body builder project',
        id: '2',
        tickets: [
            { title: 'bug in h2', author: 'sopa' },
            { title: 'finish navbar', author: 'carlos' },
            { title: 'start logo', author: 'david' },
        ],
    },
    {
        name: 'corner bet',
        id: '3',
        tickets: [
            { title: 'bug in h3', author: 'sopa' },
            { title: 'finish navbar', author: 'carlos' },
            { title: 'start logo', author: 'david' },
        ],
    },
    {
        name: 'noticket the project',
        id: '4',
        tickets: [],
    },
];

const router = require('./routes/index.js');
app.use('/api/v1', router);

// app.get('/project', (req, res) => {
//     res.json(dummy);
// });

// app.get('/project/:id/ticket', (req, res) => {
//     const { id } = req.params;
//     const project = dummy.find((project) => {
//         return project.id == id;
//     });
//     res.json(project);
// });

// app.post('/project', (req, res) => {
//     // put this logic in a middleware later:

//     res.json(req.body);
// });

// app.post('/project/:id/ticket', (req, res) => {
//     let ticket = new Ticket(req.body);
//     dummy.forEach((element) => {
//         if (element.id == req.params.id) {
//             element.tickets.push(ticket);
//         }
//     });
//     // do something with req.body
//     res.json({ message: 'you got it!' });
// });
