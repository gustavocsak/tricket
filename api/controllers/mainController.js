const { Project } = require('../../database/models/Project.js');
const { Ticket } = require('../../database/models/Ticket.js');

const getProjects = (req, res, next) => {
    Project.find({})
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const postProject = (req, res, next) => {
    let project = new Project(req.body);

    project
        .save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const getTickets = (req, res, next) => {
    const id = req.params.id;

    let ticketsArray = [];

    Project.findOne({ _id: id })
        .exec()
        .then((result) => {
            ticketsArray = result.tickets;
            res.status(200).json(ticketsArray);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

const postTicket = (req, res, next) => {
    const id = req.params.id;

    Project.findOne({ _id: id })
        .exec()
        .then((result) => {
            let ticket = new Ticket(req.body);
            result.tickets.push(ticket);

            result
                .save()
                .then((item) => {
                    res.json({ message: 'Ticket added!' });
                })
                .catch((error) => {
                    res.json(error);
                });
        })
        .catch((error) => {
            res.json(error);
        });
};

module.exports = {
    getProjects,
    postProject,
    getTickets,
    postTicket,
};
