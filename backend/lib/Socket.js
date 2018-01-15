const database = require('./Database');
const server = require('./Server');

const STATUS_CODES = {
  OK: 'OK',
  ERROR: 'ERROR'
}
class Socket {
  constructor(socket) {
    this.socket = socket;
    this.socket.on('disconnect', this.onDisonnect.bind(this));
    this.socket.on('Lobby::findAllMatches', this.onLobbyFindAllMatches.bind(this));
    this.socket.on('Lobby::createMatch', this.onLobbyCreateMatch.bind(this));
    this.socket.on('Lobby::joinMatch', this.onLobbyJoinMatch.bind(this));
    this.socket.on('Lobby::getPlayersInRoom', this.onLobbyGetPlayers.bind(this));
    this.socket.on('Map::index', this.onMapIndex.bind(this));
    this.socket.on('Map::readOne', this.onMapReadOne.bind(this));

    this.connectLobby();
  }

  connectLobby() {
    this.socket.join('lobby');
    server.broadcastRoom('lobby', 'Lobby::playerJoined', this.getCurrentUser());
  }

  disconnectLobby() {
    this.socket.leave('lobby');
    server.broadcastRoom('lobby', 'Lobby::playerLeft', this.getCurrentUser());
  }

  onDisonnect() {
    console.log('Socket disconnected');
  }

  getCurrentUser() {
    return this.socket.handshake.session.user;
  }

  /**
   * Finds all available matches
   * @param  {[type]}   data     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  onLobbyFindAllMatches(data, callback) {
    database.models.Lobby.findAll({

    }).then((lobbies) => {
      callback({ status: 'OK', data: lobbies});
    }).catch((e) => {
      callback({status: STATUS_CODES.ERROR, message: e});
    });
  }

  onLobbyCreateMatch(data, callback) {
    const defaultLobbyData = {slots: [{type: 'player', id: this.getCurrentUser()}]};
    database.models.Lobby.create(defaultLobbyData)
    .then((lobby) => {
      this.socket.join(lobby.id);
      callback({status: STATUS_CODES.OK, data: lobby});
    }).catch((e) => {
      callback({status: STATUS_CODES.ERROR});
    });
  }

  onLobbyJoinMatch(data, callback) {
    // test if match exists
    database.models.Lobby.findOne({
      where: {
        id: data.id
      }
    }).then((lobby) => {
      if (!lobby) {
        return callback({status: STATUS_CODES.ERROR, message: 'lobby not found'});
      }
      this.socket.join(lobby.id); // finally join the room
      server.broadcastRoom(lobby.id, 'Lobby::playerJoined', {
        type: 'player',
        id: that.getCurrentUser()._id,
        username: that.getCurrentUser().username,
      });
      return callback({status: STATUS_CODES.OK });
    }).catch((e) => {
      callback({status: STATUS_CODES.ERROR, message: e});
    });
  }

  onMapIndex(data, callback) {
    database.models.Map.findAll({
      where: data
    }).then((maps) => {
      callback({status: STATUS_CODES.OK, data: maps});
    }).catch((e) => {
      callback({status: STATUS_CODES.ERROR, message: e});
    });
  }

  onMapReadOne(data, callback) {
    database.models.Map.findOne({
      where: {
        id: data.id
      }
    }).then((map) => {
      callback({status: STATUS_CODES.OK, data: map});
    }).catch((e) => {
      callback({status: STATUS_CODES.ERROR, message: e});
    });
  }

  onLobbyGetPlayers(data, callback) {
    callback({status: STATUS_CODES.OK, data: server.getPlayersInRoom('lobby')});
  }
}

module.exports = Socket;
