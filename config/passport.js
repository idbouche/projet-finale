var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/user');

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


//Middleware
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  rollField: 'roll',
  passReqToCallback: true
}, function(req, email, password, done) {
  User.findOne({ email: email}, function(err, user) {
    if (err) return done(err);

    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user has been found'));
    }

    if (!user.comparePassword(password)) {
      return done(null, false, req.flash('loginMessage', 'No user has been found'));
    }
    return done(null, user);
  });
}));

passport.use('local-admin_login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  rollField: 'roll',
  passReqToCallback: true
}, function(req, email, password, done) {
  User.findOne({ email: email}, function(err, user) {
    if (err) return done(err);

    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user has been found'));
    }

    if (!user.comparePassword(password)) {
      return done(null, false, req.flash('loginMessage', 'No user has been found'));
    }
    return done(null, user);
  });
}));

//custom function to validate
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

exports.adminIsAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    if (res.locals.user.roll === 3) {
      return next();
    }else{
      res.redirect('/admin_login');
    }

  }

}
