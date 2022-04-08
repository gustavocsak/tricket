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
            res.set('content-location', `/api/v1/projects/${result._id}`);
            res.status(201).json({
                url: `/api/v1/projects/${result._id}`,
                data: result,
            });
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
                    res.status(500).json(error);
                });

            result.tickets.push(ticket._id);

            result
                .save()
                .then((result) => {
                    res.set('content-location', `/api/v1/tickets/${result._id}`);
                    res.status(201).json({
                        url: `/api/v1/tickets/${result._id}`,
                        data: result,
                    });
                })
                .catch((error) => {
                    res.status(500).json(error);
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
            res.status(500).json(err);
        } else {
            res.set('content-location', `/api/v1/tickets/${_id}`);
            res.status(201).json({
                url: `/api/v1/tickets/${_id}`,
                data: item,
            });
        }
    });
};

const deleteTicket = (req, res) => {
    const id = req.params.id;

    Ticket.findByIdAndDelete(id, (err, item) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ message: 'item deleted' });
        }
    });
};

const deleteProject = (req, res) => {
    const id = req.params.id;

    Project.findByIdAndDelete(id, (err, item) => {
        if (err) {
            res.status(500).json(err);
        } else {
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
