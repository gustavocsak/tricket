const router = require('express').Router({ mergeParams: true });

const { getProjects, postProject, getTickets, postTicket } = require('../controllers/mainController.js');

router.get('/', getProjects);
router.post('/', postProject);
router.get('/:id/tickets', getTickets);
router.post('/:id/tickets', postTicket);

module.exports = router;
