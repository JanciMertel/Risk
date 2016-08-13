var lobbyController = require('../controllers/LobbyController')
var mapController = require('../controllers/MapController')

var _ = require('lodash');

function Socket(socket)
{
    this.socket = socket;
    this.socket.on('disconnect', this.onDisonnect.bind(this));
    this.socket.on('Lobby::findAllMatches', this.onLobbyFindAllMatches.bind(this))
    this.socket.on('Lobby::createMatch', this.onLobbyCreateMatch.bind(this))

    this.socket.on('Map::index', this.onMapIndex.bind(this))
}

Socket.prototype.onDisonnect = function()
{
    console.log('Socket disconnected');
}

Socket.prototype.getCurrentUser = function()
{
  return this.socket.client.request.user;
}

/**
 * Finds all available matches
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Socket.prototype.onLobbyFindAllMatches = function(data, callback)
{
    var that = this;
    var promise = lobbyController.findAvailableLobbies();
    promise.then(function(lobbies)
    {
      callback(lobbies)
    }).catch(function(err)
    {
      console.log(err);
      calback(false)
    })
}

Socket.prototype.onLobbyCreateMatch = function(data, callback)
{
  var that = this;
  var defaultLobbyData = {state:0, slots: [ { type: "player", id: this.getCurrentUser()._id}], maxPlayers:1, name: '-'}
  var promise = lobbyController.createLobby(_.extend(defaultLobbyData, data));
  promise.then(function(lobby)
  {
    that.socket.join(lobby._id)
    callback(lobby.toObject())
  }).catch(function(err)
  {
    console.log(err);
    calback(false)
  })
}

Socket.prototype.onMapIndex = function(data, callback)
{
  var that = this;
  var promise = mapController.index({public: true});
  promise.then(function(maps)
  {
    callback(maps)
  }).catch(function(err)
  {
    console.log(err);
    calback(false)
  })
}


module.exports = Socket;
