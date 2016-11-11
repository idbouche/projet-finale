var router = require('express').Router();
var User = require('../model/user');
var async = require('async');
var passport = require('passport');
var passportConf = require('../config/passport');



router.get('/login', function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('accounts/login', { message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/profile', passportConf.isAuthenticated, function(req, res, next) {
  User
    .findOne({ _id: req.user._id })
    .populate('history.item')
    .exec(function(err, foundUser) {
      if (err) return next(err);
      console.log(foundUser);
      res.render('accounts/profile', { user: foundUser });
    });
});

router.get('/signup', function(req, res, next) {
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});

router.post('/signup', function(req, res, next) {
  console.log('post');
  console.log(req.body)
  async.waterfall([
    function(callback) {
      var user = new User();

      user.profile.name = req.body.nom;
      user.profile.firstName = req.body.firstname;
      user.profile.secondeName = req.body.secondename;
      user.profile.prefirence = req.body.prefirence;
      user.profile.address = req.body.adress;
      user.profile.sex = req.body.sex;
      user.profile.age = req.body.age;
      user.profile.presintation = req.body.presintation;
      user.email = req.body.email;
      user.password = req.body.password;
      user.profile.picture = user.gravatar();
      user.created = new Date;
      user.roll = 1;

      User.findOne({ email: req.body.email }, function(err, existingUser) {

        if (existingUser) {
          req.flash('errors', 'Account with that email address already exists');
          return res.redirect('/signup');
        } else {
          user.save(function(err, user) {
            if (err) return next(err);
            return res.redirect('/');
          });
        }
      });
    }
  ]);
});


router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/edit', function(req, res, next) {
  res.render('accounts/edit', { message: req.flash('success')});
});

router.post('/edit', function(req, res, next) {
  User.findOne({ _id: req.user._id }, function(err, user) {

    if (err) return next(err);

    if (req.body.nom) user.profile.name = req.body.nom;
    if (req.body.address) user.address = req.body.address;

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', 'Successfully Edited your profile');
      return res.redirect('/edit');
    });
  });
});

router.get('/forget', function(req, res, next) {
  res.render('accounts/forget', {
    errors: req.flash('errors')
  });
});

module.exports = router;
