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
  routes = require('./routes'),
  folder = path.join(__dirname, '../app'),
  config = require('./config');

passport.use(new LocalStrategy(
  function (username, password, done) {
    var pass = password;

    User.findOne({email: username}, function (err, user) {
      if (user && user.authenticate(pass)) {
        console.log(JSON.stringify(user));
        return done(null, {
          name: user.name,
          email: user.email,
          id: user._id
        });
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

app.use('/', routes);

module.exports = app;