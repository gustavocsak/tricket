const router = require('express').Router({ mergeParams: true });

const {
    getProjects,
    postProject,
    getTickets,
    postTicket,
    patchTicket,
    deleteTicket,
    getProject,
    deleteProject,
} = require('../controllers/mainController.js');

router.get('/projects', getProjects);
router.get('/projects/:id', getProject);
router.post('/projects', postProject);
router.get('/projects/:id/tickets', getTickets);
router.post('/projects/:id/tickets', postTicket);
router.patch('/tickets/:id', patchTicket);
router.delete('/tickets/:id', deleteTicket);
router.delete('/projects/:id', deleteProject);

module.exports = router;
