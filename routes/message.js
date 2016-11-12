var express = require('express');
var router = express.Router();
var passportConf = require('../config/passport');
var secretConf = require('../config/secret');
var mongoose = require('mongoose');
var User = require('../model/user');
var Message = require('../model/message');
var productDB = mongoose.connection.db;
var nodemailer = require('nodemailer');
var SocketIOChat = require('socketio-chat');
var async = require('async');



/* GET home page. */
router.get('/', passportConf.isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/message', function(req, res, next) {
  async.waterfall([
    function(callback) {
      var message = new Message();
      message.userId    = req.user._id ;
      message.userName  = req.user.profile.name ;
      message.message   = req.body.message;
      message.messageAvatar = req.user.profile.picture ;
      message.created   = new Date; 
      message.save(function(err, messages) {
        if (err) return next(err)
        res.redirect('/')
      });
    }
  ]);
});

router.get('/message', passportConf.isAuthenticated, function(req, res, next) {
     Message.find({ userId:  { $in : [req.user._id, req.user.friends[0].id] } }, function(err, messages) {
          if (messages) {
            return res.json({ message: messages });
          } else {
            console.log(err)
          }
        });
});

module.exports = router;