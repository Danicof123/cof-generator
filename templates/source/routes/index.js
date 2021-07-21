const express = require('express'),
      router = express.Router(),
      // Controllers
      {home} = require('../controllers/indexControllers');

router
      .get('/', home)


module.exports = router;