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

    Ticket.find({})
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = {
    getProjects,
    postProject,
    getTickets,
};
