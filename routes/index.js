'use strict';

const router = require('express').Router(),
    userRoutes = require('./userRoutes'),
    markerRoutes = require('./markerRoutes'),
    chatRoutes = require('./chatRoutes'),
    errorRoutes = require('./errorRoutes');

router.use('/users', userRoutes);
router.use('/markers', markerRoutes);
router.use('/chat', chatRoutes);
router.use('/error', errorRoutes);

module.exports = router;