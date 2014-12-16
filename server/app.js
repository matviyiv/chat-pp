var express = require('express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  mongoStore = require('connect-mongodb'),

  path = require('path'),

  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,

  app = express(),

  db,
  User = require('./db/models/User').createUser(mongoose),
  folder = path.join(__dirname, '../app'),
  config = require('./config');

passport.use(new LocalStrategy(
  function (username, password, done) {
    var pass = password;

    User.findOne({email: username}, function (err, user) {
      if (user && user.authenticate(pass)) {
        return done(null, {name: "admin"});
      } else {
        return done(null, false, {message: 'Incorrect username.'});
      }
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function (req, res, next) {
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
};

app.set('db-uri', config.db.url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  store: mongoStore(app.set('db-uri')),
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(folder));

db = mongoose.connect(app.set('db-uri'));

app.post('/user/new', function (req, res) {
  var user = new User(req.body);

  user.save(function (err) {
    if (err) {
      //TODO make error
      res.end(500);
      return;
    }

    req.session.user_id = user.id;

    if (req.isAuthenticated()) {
      req.logOut();
    }
    res.end();
  });
});

app.get('/chat/list', auth, function (req, res) {
  res.json([
    {
      id: 1,
      name: 'chat_1',
      description: 'the cool chat',
      isActive: true
    },
    {
      id: 2,
      name: 'chat_2',
      description: 'the cool chat 2',
      isActive: true
    },
    {
      id: 3,
      name: 'chat_3',
      description: 'the cool chat 3',
      isActive: true
    },
    {
      id: 4,
      name: 'chat_4',
      description: 'the cool chat 4',
      isActive: true
    }
  ]);
});

app.get('/loggedin', function (req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/login', passport.authenticate('local'), function (req, res) {
  res.send(req.user);
});

app.post('/logout', function (req, res) {
  req.logOut();
  res.send(200);
});

module.exports = app;