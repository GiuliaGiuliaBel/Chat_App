  'use strict';
  
  const router = require('express').Router(),
  usersController = require('../controllers/usersController');

  router.get('/', usersController.chat);

  module.exports = router;