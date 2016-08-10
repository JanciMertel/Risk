// get models
var database = require('./core/lib/Database')
database.connect();

//models
require('./core/models/Lobby')

var server = require('./core/lib/Server')
server.start(3000);
