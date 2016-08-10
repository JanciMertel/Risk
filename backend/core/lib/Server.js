var Socket = require('./Socket');
var express = require('express')
var http = require('http')
var socketIo = require('socket.io');

var session = require('express-session');
var passportSocketIo = require("passport.socketio");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var SQLiteStore = require('connect-sqlite3')(session);
var sessionStore = new SQLiteStore();

var Mongoose = require('mongoose');

// Auth strategy init + callbacks
passport.use(new Strategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    Mongoose.model('User').findOne({ username: username}, function (err, user) {
      req.message = 'ERROR'; // default message
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password))
      {
        return done(null, false);
      }
      req.message = 'OK';
      return done(null, user);
    });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, done) {
   Mongoose.model('User').findById(id, function(err, user) {
       done(err, user);
   });
});

function Server()
{
  this.io = null;
  this.httpServer = null;
  this.start = function(port) {
    port = port || 3000
    var app = express();

    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(session({store: sessionStore, key: 'connect.sid', secret: 'secret', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());
    //testing purposes
    app.use(express.static(__dirname + '/public'));

    this.httpServer = http.Server(app);
    this.io = socketIo(this.httpServer);

    this.io.use(passportSocketIo.authorize({
      cookieParser: require('cookie-parser'),       // the same middleware you registrer in express
      key:          'connect.sid',       // the name of the cookie where express/connect stores its session_id
      secret:       'secret',    // the session_secret to parse the cookie
      store:        sessionStore,        // we NEED to use a sessionstore. no memorystore please
  //    success:      function() { console.log('succ')},  // *optional* callback on success - read more below
  //    fail:         function() { console.log('fail')},     // *optional* callback on fail/error - read more below
    }));

    // login point accessible via xhr
    app.post('/login',
      passport.authenticate('local', { failureRedirect: '/login' }),
      function(req, res) {
        res.json({message: req.message})
        res.end();  // return nothing simply...
      }
    );

    this.io.on('connection', function(socket){
      console.log('connection')
        socket.socket = new Socket(socket);
        socket.on('test', function(data, cb)
        {
            cb('woot');
        })
    });
    this.httpServer.listen(port);
  }
}

var server = new Server();
module.exports = server;
