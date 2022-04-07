const router = require('express').Router({ mergeParams: true });

const { getProjects, postProject, getTickets, postTicket, patchTicket, deleteTicket } = require('../controllers/mainController.js');

router.get('/projects', getProjects);
router.post('/projects', postProject);
router.get('/projects/:id/tickets', getTickets);
router.post('/projects/:id/tickets', postTicket);
router.patch('/tickets/:id', patchTicket);
router.delete('/tickets/:id', deleteTicket);

module.exports = router;
