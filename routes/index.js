var express = require('express');
var router = express.Router();
var passportConf = require('../config/passport');

/* GET home page. */
router.get('/', passportConf.isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
