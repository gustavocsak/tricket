let path = require('path');
const router = require('express').Router({ mergeParams: true });

const mainRouter = require(path.join(__dirname, 'mainRouter.js'));

router.use('/', mainRouter);

module.exports = router;
