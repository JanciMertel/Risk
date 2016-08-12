var io = require('socket.io-client')

class Connection {
  constructor () {
    this.socket = null
    //this.connect()
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
        var response = JSON.parse(request.responseText);
        if (request.status === 200) {
            if(response.message && response.message == 'OK')
            {
              success(response);
            }
            else {
              error(response);
            }
        } else {
          error(response);
        }
      }
    }
    request.open('POST', url, true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    request.setRequestHeader('Accept', 'application/json');
    request.withCredentials = true;
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
