const router = require('express').Router({ mergeParams: true });

const mainRouter = require('./mainRouter.js');

router.use('/projects', mainRouter);

module.exports = router;
