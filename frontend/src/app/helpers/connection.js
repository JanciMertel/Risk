var io = require('socket.io-client')

class Connection {
  constructor () {
    this.socket = null

    this.connect()
    this.bindEvents()
  }

  connect () {
    if(!this.socket)
    {
      this.socket = io(window.server)
      this.socket.on('connect', this.onConnect.bind(this))
    }
  }

  doHttpRequest (url, data, success, error) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          success(JSON.parse(request.responseText));
        } else {
          error(request.responseText);
        }
      }
    }

    request.open('POST', url, true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    request.send(data)
  }

  onConnect () {
    console.log('Connected to server')
  }

  on () {
    this.socket.on.apply(this.socket, arguments)
  }

  emit () {
    this.socket.emit.apply(this.socket, arguments)
  }

  // use stuff in here somewhere else
  bindEvents () {
    this.socket.on('Lobby::startMatch', this.onLobbyStartMatch)
    this.socket.on('Match::info', this.onMatchInfo)
    this.socket.on('Match::step', this.onMatchStep)
    this.socket.on('Match::actionInfo', this.onMatchActionInfo)
    this.socket.on('Match::endTurn', this.onGameEndTurn)
    this.socket.on('Match::endMatch', this.onGameEndMatch)
  }

  onLobbyStartMatch () {

  }

  onMatchInfo () {

  }

  onMatchStep () {

  }

  onMatchActionInfo () {

  }

  onMatchEndTurn () {

  }

  onMatchEndMatch () {

  }
}

const connection = new Connection()

module.exports = connection
