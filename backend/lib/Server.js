const Socket = require('./Socket');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser')();
const expressSession = require('express-session');
const memoryStore = new expressSession.MemoryStore();
const sharedSession = require("express-socket.io-session");
const database = require('./Database');
const SESSION_ID = 'sid';
const SESSION_SECRET = '12345'; // ultra

const config = require('../config');

class Server {
  constructor(config) {
    this.io = null;
    this.httpServer = null;
    this.app = null;
    this.database = database;
    this.config = config;
  }

  start() {
    this.app = express();

    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Credentials", true);
      res.header("Access-Control-Allow-Origin", "http://localhost:8080");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.app.use(cookieParser);
    this.app.use(require('body-parser').urlencoded({ extended: true }));

    const session = expressSession({
      key: SESSION_ID,
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    });
    this.app.use(session);

/*    this.app.get('/', (req, res) => {
      console.log('/', req.session);
      req.session.tralala ='123';

      res.send();
    })*/

    //this.app.use(express.static(__dirname + '/../../../dist'));

    this.httpServer = http.Server(this.app);
    this.io = socketIo(this.httpServer);
    this.io.use(sharedSession(session, {
      autoSave:true,
    }));
    this.io.origins('*:*');

    // do basic authorization
    this.io.use(function(socket, accept) {
      // current userId should be stored here - if already logged - socket.handshake.session.userId
      if (socket.handshake.query.login) {
        const { username, password } = JSON.parse(socket.handshake.query.login);
        if ( true ) { // if credentials are valid, authorize - TODO should fetch user object from db and do auth
          socket.handshake.session.userId = 1; // fake
          socket.handshake.session.save();
          return accept(null, true);
        }
      }
      return accept(new Error('Cannot authorize'), true);
    });

    this.io.on('connection', (socket) => {
        console.log('New socket.io connection');
        socket.socket = new Socket(socket);
    });

    this.httpServer.listen(this.config.port);
  }

  /**
   * Broadcas to chosen room. Callback is not provided, response not needed
   * @param  {[type]} roomId    [description]
   * @param  {[type]} eventName [description]
   * @param  {[type]} eventData [description]
   * @return {[type]}           [description]
   */
  broadcastRoom(roomId, eventName, eventData) {
    this.io.to(roomId).emit(eventName, eventData);
  }
}

const server = new Server(config.server);
module.exports = server;
