var express = require('express'),
    router  = express.Router(),
    passport = require('passport');

router.get('/loggedin', function (req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.send(req.user);
});

router.post('/logout', function (req, res) {
  req.logOut();
  res.send(200);
});

module.exports = router;