var router = require('express').Router();
var User = require('../model/user');
var passportConf = require('../config/passport');
var passport = require('passport');

router.get('/admin_login', function(req, res) {
  console.log(req);
  if (req.user && req.user.roll === 3) return res.redirect('/list');
  res.render('admin/admin_login', { message: req.flash('loginMessage')});
});

router.post('/admin_login', passport.authenticate('local-admin_login', {
  successRedirect: '/list',
  failureRedirect: '/admin_login',
  failureFlash: true
}));

router.get('/list', passportConf.adminIsAuthenticated,function(req, res, next) {
  User.find({}, function(err, allUser) {
    if (err) return err
    //console.log(allUser);
    res.render('admin/list', { users: allUser });
  });
});

router.get('/admin_edit/:id',passportConf.adminIsAuthenticated, function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    res.render('admin/edit', { users: user });
  });
});
router.post('/admin_edit/:id',passportConf.adminIsAuthenticated, function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(err, user) {

    if (err) return next(err);

    if (req.body.nom) user.profile.name = req.body.nom;
    if (req.body.address) user.address = req.body.address;
    if (req.body.roll) user.roll = req.body.roll;

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', 'Successfully Edited profile');
      return res.redirect('/list');
    });
  });
})


module.exports = router;
