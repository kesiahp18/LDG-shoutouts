const router = require('express').Router();

const userRoutes = require('./user-routes');
const shoutRoutes = require('./shoutout-routes');

router.use('/users', userRoutes);
router.use('/shoutouts', shoutRoutes);

module.exports = router;