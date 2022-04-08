let path = require('path');

const { Project } = require(path.join(__dirname, '..', '..', 'database', 'models', 'project.js'));
const { Ticket } = require(path.join(__dirname, '..', '..', 'database', 'models', 'ticket.js'));

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

const getProject = (req, res) => {
    const id = req.params.id;
    Project.findById(id)
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

    Project.findOne({ _id: id })
        .populate('tickets')
        .then((result) => {
            res.json(result);
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

            ticket
                .save()
                .then((item) => {})
                .catch((error) => {
                    res.json(error);
                });

            result.tickets.push(ticket._id);

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

const patchTicket = (req, res) => {
    const { _id, author, title, status, description } = req.body;

    Ticket.findByIdAndUpdate(_id, { author: author, title: title, status: status, description: description }, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            console.log(item);
        }
    });

    res.status(200).json({ message: 'item updated' });
};

const deleteTicket = (req, res) => {
    const id = req.params.id;

    Ticket.findByIdAndDelete(id, (err, item) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log(item);
            res.status(200).json({ message: 'item deleted' });
        }
    });
};

const deleteProject = (req, res) => {
    const id = req.params.id;

    Project.findByIdAndDelete(id, (err, item) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log(item);
            res.status(200).json({ message: 'item deleted' });
        }
    });
};

module.exports = {
    getProjects,
    getProject,
    postProject,
    getTickets,
    postTicket,
    patchTicket,
    deleteTicket,
    deleteProject,
};
