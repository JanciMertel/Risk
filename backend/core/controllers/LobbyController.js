/**
 * LobbyController module - without prototyping
 */

var Mongoose = require('mongoose');

function LobbyController()
{
  this.createLobby = function(data)
  {
    var Lobby = Mongoose.model('Lobby')
    var lobby = new Lobby(data);
    return new Promise(function(resolve, reject)
    {
      lobby.save(function (err) {
        if (err) reject('Error on save!');
        resolve(lobby);
      });
    });
  }

  this.findAvailableLobbies = function(data)
  {
    var Lobby = Mongoose.model('Lobby')
    return new Promise(function(resolve, reject)
    {
      Lobby.find({state:'NEW'}, function(err, lobbies) {
        if (err) reject('Error in query!');
        resolve(lobbies);
      });
    });
  }
}

var lobbyController = new LobbyController()
module.exports = lobbyController;
