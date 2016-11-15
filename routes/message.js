var express = require('express');
var router = express.Router();
var passportConf = require('../config/passport');
var secretConf = require('../config/secret');
var mongoose = require('mongoose');
var User = require('../model/user');
var Message = require('../model/message');
var Chat = require('../model/chat')
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

router.get('/messages', passportConf.isAuthenticated, function(req, res, next) {
    var tab = []
     for (i=0; i< req.user.friends.length; i++){
        tab.push(req.user.friends[i].id)
     }
     tab.push(req.user._id)
     Message.find({ userId:  { $in : tab} }, function(err, messages) {
          if (messages) {
            return res.json({ message: messages });
          } else {
            console.log(err)
          }
        });
});

router.get('/message', passportConf.isAuthenticated, function(req, res, next) {
     Message.find({ userId: req.query.id }, function(err, messages) {
          if (messages) {
            return res.json({ message: messages });
          } else {
            console.log(err)
          }
        });
});

/*router.get('/chat', passportConf.isAuthenticated, function(req, res, next) {
     Message.find({ userId: req.query.id }, function(err, messages) {
          if (messages) {
            return res.json({ message: messages });
          } else {
            console.log(err)
          }
        });
});*/

router.post('/chat', passportConf.isAuthenticated, function(req, res, next) {

    console.log(req.body)
    console.log(req.query)

    async.waterfall([
    function(callback) {
      var chat = new Chat();
      chat.senderId    = req.user._id ;
      chat.senderName  = req.user.profile.name ;
      chat.resoverId    = req.query.id ;
      chat.resoverName  = req.query.name ;      
      chat.message   = req.body.message;
      chat.senderAvatar = req.user.profile.picture ;
      chat.resoverAvatar = req.query.avatar
      chat.created   = new Date; 
      chat.save(function(err, chats) {
        if (err) return next(err)
        console.log(chats)
        res.redirect('/')
      });
    }
  ]);
});


module.exports = router;