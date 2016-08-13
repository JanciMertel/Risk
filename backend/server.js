var fs = require('fs');
var _ = require('lodash');

//cleanup
try {
    fs.accessSync('sessions.db', fs.F_OK);
    fs.unlinkSync('sessions.db');
} catch (e) {
}

// get models
var database = require('./core/lib/Database')
database.connect(function()
{
  //models
  require('./core/models/Map')
  require('./core/models/Lobby')
  require('./core/models/User')

  //controllers
  var mapController = require('./core/controllers/MapController')
  var lobbyController = require('./core/controllers/LobbyController')

  var server = require('./core/lib/Server')

  server.start(3000);

});
