
console.log('wa1t')
function Connection()
{

  this.socket = null;
  this.connect = function() {
    if(!this.socket)
    {
      this.socket = io(window.server);
      this.socket.on('connect', this.onConnect.bind(this))
    }
  }
  this.onConnect = function() {
    console.log('Connected to server.')
  }

  this.on = function() {
    this.socket.on.apply(this.socket, arguments);
  }

  this.emit = function() {
    this.socket.emit.apply(this.socket, arguments);
  }

  // use stuff in here somewhere else
  this.bindEvents = function() {
    this.socket.on('Lobby::startGame', this.onLobbyStartGame)
    this.socket.on('Match::info', this.onMatchInfo)
    this.socket.on('Match::step', this.onMatchStep)
    this.socket.on('Match::actionInfo', this.onMatchActionInfo)
    this.socket.on('Match::endTurn', this.onMatchEndTurn)
    this.socket.on('Match::endMatch', this.onMatchEndMatch)
  }

  this.onLobbyStartGame = function() {

  }

  this.onMatchInfo = function() {

  }

  this.onMatchStep = function() {

  }

  this.onMatchActionInfo = function() {

  }

  this.onMatchEndTurn = function() {

  }

  this.onMatchEndMatch = function() {

  }
}
