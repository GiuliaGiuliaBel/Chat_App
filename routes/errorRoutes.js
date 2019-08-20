'use strict';

const router = require('express').Router(),
errorController = require('../controllers/errorController');

router.use(errorController.pageNotFound);

module.exports = router;