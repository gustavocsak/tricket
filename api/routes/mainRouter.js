const router = require('express').Router({ mergeParams: true });

const { getProjects, postProject, getTickets } = require('../controllers/mainController.js');

router.get('/', getProjects);
router.post('/', postProject);
router.get('/:id/tickets', getTickets);

module.exports = router;
