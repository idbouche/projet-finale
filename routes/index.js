var express = require('express');
var router = express.Router();
var passportConf = require('../config/passport');
var secretConf = require('../config/secret');
var mongoose = require('mongoose');
var User = require('../model/user');
var productDB = mongoose.connection.db;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://'+secretConf.userEmail+':'+secretConf.pass+'@smtp.gmail.com');

/* GET home page. */
router.get('/', passportConf.isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', passportConf.isAuthenticated, function(req, res, next) {
  console.log(req.query.name)
  var textSearch = req.query.name.replace(/,/g, " ")
  console.log(textSearch)
  User.find({ $text: { $search: `\"${textSearch}\"` } },function(err, result) {
      if (err) {
        //throw err;
        console.log(err)
      }else {
        console.log(result)
        res.json({result:result});
      }
    });
});
router.get('/invet', passportConf.isAuthenticated, function(req, res, next) {
  console.log(req.query.email)
  console.log(req.query.idi)
  var textSearch = req.query.email

  var mailOptions = {
    from: '"'+ req.user.name+' 👥 " '+req.user.email , // sender address 
    to: secretConf.userEmail, // list of receivers 
    subject: 'Hello ✔', // Subject line 
    text: 'Hello world 🐴', // plaintext body 
    html: '<a href="http://localhost:3000/accept/'+req.user._id+'/'+req.query.idi+'">Accept Ivetation</a>' // html body 
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
     res.render('index', { title: 'Express' });
});
  //req.user._id 
  
});

router.get('/accept/:id/:id2', passportConf.isAuthenticated, function(req, res, next) {
  console.log(req.params.id)
  User.update({ _id: req.params.id }, { $set: { friends: {id : req.params.id2}  }}, function(err, res){
    if(err){
      console.log(err)
      retuen
    }
    User.update({ _id: req.params.id2 }, { $push: { friends:{id : req.params.id} }}, function(err, res){
      if(err){
        console.log(err)
        retuen
      }
      res.redirect('/');
    });
  });
  
  
});



module.exports = router;
