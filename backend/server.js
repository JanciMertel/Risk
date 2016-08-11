var fs = require('fs');

//cleanup
try {
    fs.accessSync('sessions.db', fs.F_OK);
    fs.unlinkSync('sessions.db');
} catch (e) {
}

// get models
var database = require('./core/lib/Database')
database.connect();

//models
require('./core/models/Lobby')
require('./core/models/User')

//controllers
require('./core/controllers/LobbyController')

var server = require('./core/lib/Server')

server.start(3000);
