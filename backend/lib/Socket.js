var lobbyController = require('../controllers/LobbyController');
var mapController = require('../controllers/MapController');
var server = require('./Server');

var _ = require('lodash');

class Socket {
  constructor(socket) {
    this.socket = socket;
    this.socket.on('disconnect', this.onDisonnect.bind(this));
    this.socket.on('Lobby::findAllMatches', this.onLobbyFindAllMatches.bind(this));
    this.socket.on('Lobby::createMatch', this.onLobbyCreateMatch.bind(this));
    this.socket.on('Lobby::joinMatch', this.onLobbyJoinMatch.bind(this));

    this.socket.on('Map::index', this.onMapIndex.bind(this));
    this.socket.on('Map::readOne', this.onMapReadOne.bind(this));
  }

  onDisonnect() {
    console.log('Socket disconnected');
  }

  getCurrentUser() {
    return this.socket.client.request.user;
  }

  /**
   * Finds all available matches
   * @param  {[type]}   data     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  onLobbyFindAllMatches(data, callback) {
    var that = this;
    var promise = lobbyController.findAvailableLobbies();
    promise.then(function(lobbies) {
      callback({status: 'OK', data: lobbies});
    }).catch(function(err) {
      console.log(err);
      callback({status: 'ERROR'});
    });
  }

  onLobbyCreateMatch(data, callback) {
    var that = this;
    var defaultLobbyData = {slots: [{type: 'player', id: this.getCurrentUser()._id}]};
    var promise = lobbyController.createLobby(_.extend(defaultLobbyData, data));
    promise.then(function(lobby) {
      that.socket.join(lobby._id);
      callback({status: 'OK', data: lobby.toObject()});
    }).catch(function(err) {
      console.log(err);
      callback({status: 'ERROR'});
    });
  }

  onLobbyJoinMatch(data, callback) {
    var that = this;

    // test if match exists
    var promise = lobbyController.index({'_id': data.id}, ['map']);
    promise.then(function(lobby) {
      if (!lobby.length) {
        return callback({status: 'ERROR', description: 'lobby not found'});
      }// not found lobby
      else {
        lobby = lobby[0];
      }

      if (lobby.maxPlayers <= lobby.slots.length) {
        return callback({status: 'ERROR', description: 'no slots available'});
      } // no slot available

      lobby.slots.push({type: 'player', id: that.getCurrentUser()._id, username: that.getCurrentUser().username});

      // update
      var updatePromise = lobbyController.update({'_id': data.id}, {slots: lobby.slots});
      updatePromise.then(function(lobby) {
        callback({status: 'OK', data: lobby.map});
        that.socket.join(lobby._id); // finally join the room

        server.broadcastRoom(lobby._id, 'Lobby::playerJoined', {
          type: 'player',
          id: that.getCurrentUser()._id,
          username: that.getCurrentUser().username,
        });
      }).catch(function(err) {
        console.log(err);
        callback({status: 'ERROR', description: err});
      });
    }).catch(function(err) {
      console.log(err);
      callback({status: 'ERROR', description: err});
    });
  }

  onMapIndex(data, callback) {
    var that = this;
    var promise = mapController.index({});
    promise.then(function(maps) {
      callback({status: 'OK', data: maps});
    }).catch(function(err) {
      console.log(err);
      callback({status: 'ERROR'});
    });
  }

  onMapReadOne(data, callback) {
    const promise = mapController.index({'_id': data.id});
    promise.then(function(map) {
      if (map.length) {
        map = map[0];
      }
      callback({status: 'OK', data: map});
    }).catch(function(err) {
      console.log(err);
      callback({status: 'ERROR'})
    })
  }
}

module.exports = Socket;
