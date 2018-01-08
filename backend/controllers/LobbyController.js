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

  this.index = function(data, populate)
  {
    var Lobby = Mongoose.model('Lobby')
    return new Promise(function(resolve, reject)
    {
      var request = Lobby.find(data);
      if(populate && populate.length)
      {
        for(var i in populate)
        {
          request = request.populate(populate[i]);
        }
      }
      request.exec(function(err, lobies) {
        if (err) reject('Error in query!');
        resolve(lobies);
      });
    });
  }
}

var lobbyController = new LobbyController()
module.exports = lobbyController;
