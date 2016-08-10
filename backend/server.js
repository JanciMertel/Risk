// get models
var database = require('./core/lib/Database')
database.connect();

//models
require('./core/models/Lobby')
require('./core/models/User')

var server = require('./core/lib/Server')
server.start(3000);
