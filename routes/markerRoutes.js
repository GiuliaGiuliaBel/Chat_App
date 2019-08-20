'use strict';

const router = require('express').Router(),
markersController = require('../controllers/markersController');

router.get('/', markersController.markers, markersController.markersView);
router.post('/:id', markersController.markersMethod, markersController.markersView);
router.get('/:id', markersController.markersView);

module.exports = router;