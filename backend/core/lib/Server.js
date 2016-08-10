var Socket = require('./Socket');
var express = require('express')
var http = require('http')
var socketIo = require('socket.io');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var sessionStore = new RedisStore();
var passportSocketIo = require("passport.socketio");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var SQLiteStore = require('connect-sqlite3')(session);
var sessionStore = new SQLiteStore();

passport.use(new Strategy(
  function(username, password, cb) {
    if(username && password)
    {
      console.log('logged')
       return cb(null, {username:"cock", id: 1});
    }
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  console.log('deserialize', id)
    cb(null, {username:"coc,k", id: 1});
});

function Server()
{
  this.io = null;
  this.httpServer = null;
  this.start = function(port) {
    port = port || 3000
    var app = express();

app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));

    app.use(session({store: sessionStore, secret: 'secret', resave: false, saveUninitialized: false }));

    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(__dirname + '/public'));

    this.httpServer = http.Server(app);

    this.io = socketIo(this.httpServer);

    app.get('/wat',
      function(req, res) {
        console.log(req.session)
        res.end();
    });


    app.post('/login',
      passport.authenticate('local', { failureRedirect: '/login' }),
      function(req, res) {
        res.end();
      });

    this.io.on('connection', function(socket){
      console.log('connection')
        socket.socket = new Socket(socket);
    });
    this.httpServer.listen(port);
  }
}

var server = new Server();
module.exports = server;
