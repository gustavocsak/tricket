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

const { Project } = require('../database/models/project.js');
const { Ticket } = require('../database/models/ticket.js');

const dummy = [
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
];

app.get('/project', (req, res) => {
    res.json(dummy);
});

app.get('/project/:id/tickets', (req, res) => {
    const { id } = req.params;
    const project = dummy.find((project) => {
        return project.id == id;
    });
    res.json(project);
});
