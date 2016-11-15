var express = require('express');
var router = express.Router();
var passportConf = require('../config/passport');
var secretConf = require('../config/secret');
var mongoose = require('mongoose');
var User = require('../model/user');
var productDB = mongoose.connection.db;
var nodemailer = require('nodemailer');
var SocketIOChat = require('socketio-chat');

var transporter = nodemailer.createTransport('smtps://'+secretConf.userEmail+':'+secretConf.pass+'@smtp.gmail.com');

/* GET home page. */
router.get('/', passportConf.isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', passportConf.isAuthenticated, function(req, res, next) {
  var textSearch = req.query.name.replace(/,/g, " ") 
  User.find({ $text: { $search:`\"${textSearch}\"`}},function(err, result) {
      if (err) {
        console.log(err)
      }else {
        res.json({result:result});
      }
    });
});

router.get('/invet', passportConf.isAuthenticated, function(req, res, next) {
  var textSearch = req.query.email
  var mailOptions = {
    from: '"'+ req.user.name+' 👥 " '+req.user.email , // sender address 
    to: req.query.email, // list of receivers 
    subject: 'Hello ✔', // Subject line 
    text: 'Hello world 🐴', // plaintext body 
    html: '<a href="http://localhost:3000/accept/'+req.user._id+'/'+req.query.idi+'">Accept Ivetation</a>' // html body 
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      res.redirect('/');
    });
});

router.get('/accept/:id/:id2', passportConf.isAuthenticated, function(req, res, next) {
  User.update({ _id: req.params.id }, { $push: { friends: {id : req.params.id2}  }}, function(err, res){
    if(err){
      console.log(err)
      retuen
    }
    User.update({ _id: req.params.id2 }, { $push: { friends: {id : req.params.id} }}, function(err, res){
      if(err){
        console.log(err)
        retuen
      }          
    });   
  }); 
  res.redirect('/');
});

router.get('/friends', passportConf.isAuthenticated, function(req, res, next) {
  var tab = [];
  User
    .findOne({ _id: req.user._id })
    .populate('history.item')
    .exec(function(err, foundUser) {
      if (err) return next(err);
      for(i=0; i < foundUser.friends.length; i++ ){
        tab.push(foundUser.friends[i].id)   
      }
      User
        .find({ _id : { $in : tab }})
        .populate('history.item')
        .exec(function(err, friend) {
          if (err) return next(err);
          res.json({ user:friend });
      });
    }); 
});

module.exports = router;