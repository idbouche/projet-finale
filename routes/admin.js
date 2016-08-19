var router = require('express').Router();
var User = require('../model/user');

router.get('/list', function(req, res, next) {
  User.find({}, function(err, allUser) {
    if (err) return err
    console.log(allUser);
    res.render('admin/list', { users: allUser });
  });
});

router.get('/admin_edit/:id', function(req, res, next) {
  res.render('admin/edit', { message: req.flash('success') });
});
router.post('/admin_edit/:id', function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(err, user) {

    if (err) return next(err);

    if (req.body.nom) user.profile.name = req.body.nom;
    if (req.body.address) user.address = req.body.address;

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', 'Successfully Edited your profile');
      return res.redirect('/edit');
    });
  });
})


module.exports = router;
