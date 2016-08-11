var lobbyController = require('../controllers/LobbyController')

function Socket(socket)
{
    this.socket = socket;
    this.socket.on('disconnect', this.onDisonnect.bind(this));
    this.socket.on('Lobby::findAllMatches', this.onFindAllMatches.bind(this))
    this.socket.on('Lobby::createMatch', this.onCreateMatch.bind(this))
    console.log('socket')
    

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
Socket.prototype.onFindAllMatches = function(data, callback)
{
    console.log('onFindAllMatches')
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

Socket.prototype.onCreateMatch = function(data, callback)
{
  var that = this;
  var promise = lobbyController.createLobby({started:0, players: [this.getCurrentUser()._id]});
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
module.exports = Socket;
