var lobbyController = require('../controllers/LobbyController')
var mapController = require('../controllers/MapController')
var server = require('./Server')

var _ = require('lodash');

function Socket(socket)
{
    this.socket = socket;
    this.socket.on('disconnect', this.onDisonnect.bind(this));
    this.socket.on('Lobby::findAllMatches', this.onLobbyFindAllMatches.bind(this))
    this.socket.on('Lobby::createMatch', this.onLobbyCreateMatch.bind(this))
    this.socket.on('Lobby::joinMatch', this.onLobbyJoinMatch.bind(this))

    this.socket.on('Map::index', this.onMapIndex.bind(this))
    this.socket.on('Map::readOne', this.onMapReadOne.bind(this))
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
      callback({message: 'OK', data: lobbies})
    }).catch(function(err)
    {
      console.log(err);
      calback({message: "ERROR"})
    })
}

Socket.prototype.onLobbyCreateMatch = function(data, callback)
{
  var that = this;
  var defaultLobbyData = {slots: [ { type: "player", id: this.getCurrentUser()._id}]}
  var promise = lobbyController.createLobby(_.extend(defaultLobbyData, data));
  promise.then(function(lobby)
  {
    that.socket.join(lobby._id)
    callback({message: "OK", data: lobby.toObject()})
  }).catch(function(err)
  {
    console.log(err);
    calback({message: "ERROR"})
  })
}

Socket.prototype.onLobbyJoinMatch = function(data, callback)
{
  var that = this;
  // test if match exists
  var promise = lobbyController.index({private: false, '_id' : data.id}, ['map']);
  promise.then(function(lobby)
  {
    if(lobby.length)
      return calback({message:'ERROR'}) // not found lobby
    else
      lobby = lobby[0];

    if(lobby.maxPlayers <= lobby.slots.legth)
      return calback({message:'ERROR'}) // no slot available

    lobby.slots.push({type: "player", id: this.getCurrentUser()._id, username: this.getCurrentUser().username})

    // update
    var updatePromise = lobbyController.update({'_id' : data.id}, {slots: lobby.slots});
    updatePromise.then(function(lobby)
    {
      calback({message:'OK', data: lobby.map})
      that.socket.join(lobby._id) // finally join the room

      server.broadcastRoom(lobby._id, 'Lobby::playerJoined', {type: "player", id: this.getCurrentUser()._id, username: this.getCurrentUser().username})
    }).catch(function(err)
    {
      console.log(err);
      calback({message:'ERROR'})
    })
  }).catch(function(err)
  {
    console.log(err);
    calback({message:'ERROR'})
  })
}

Socket.prototype.onMapIndex = function(data, callback)
{
  var that = this;
  var promise = mapController.index({private: false});
  promise.then(function(maps)
  {
    callback({message: 'OK', data: maps})
  }).catch(function(err)
  {
    console.log(err);
    calback({message: 'ERROR'})
  })
}

Socket.prototype.onMapReadOne = function(data, callback)
{
  var that = this;
  var promise = mapController.index( {'_id' : data.id });
  promise.then(function(map)
  {
    if(map.length)
      map = map[0];
    callback({message: 'OK', data: map})
  }).catch(function(err)
  {
    console.log(err);
    calback({message: 'ERROR'})
  })
}

module.exports = Socket;
