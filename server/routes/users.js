var express = require('express'),
    router  = express.Router(),
    mongoose = require('mongoose'),
    _ = require('underscore');

router.post('/new', function (req, res) {
  var user = new User(req.body);

  user.save(function (err) {
    if (err) {
      //TODO make error
      return;
    }

    req.session.user_id = user.id;

    if(req.isAuthenticated()) {
      req.logOut();
    }
    res.end();
  });
});

router.get('/list', function (req, res) {
  var User = mongoose.model('User', mongoose.modelSchemas.User);
  
  User.find({}, function(err, users) {
    var userList = _.map(users, function(user) {
      return {
        id: user.id,
        name: user.get('name'),
        email: user.get('email')
      }
    });

    debugger;

    res.json(userList);
  });
  
});

module.exports = router;