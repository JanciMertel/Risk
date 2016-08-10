var _ = require('lodash')

var Connection = {

  socket = null;

  connect() {
    if(!socket)
    {
      this.socket = io(window.server);
      this.socket.on('connect', this.onConnect.bind(this))
    }
  }
  
  onConnect() {
    console.log('Connected to server.')
  }

  on() {
    this.socket.on.apply(this.socket, arguments);
  }

  emit() {
    this.socket.emit.apply(this.socket, arguments);
  }

  // use stuff in here somewhere else
  bindEvents() {
    this.socket.on('Lobby::startGame', this.onLobbyStartGame)
    this.socket.on('Match::info', this.onMatchInfo)
    this.socket.on('Match::step', this.onMatchStep)
    this.socket.on('Match::actionInfo', this.onMatchActionInfo)
    this.socket.on('Match::endTurn', this.onMatchEndTurn)
    this.socket.on('Match::endMatch', this.onMatchEndMatch)
  }

  onLobbyStartGame() {

  }

  onMatchInfo() {

  }

  onMatchStep() {

  }

  onMatchActionInfo() {

  }

  onMatchEndTurn() {

  }

  onMatchEndMatch() {

  }
}

var connection = new Connection();
connection.connect();
connection.bindEvents();

module.exports = connection
