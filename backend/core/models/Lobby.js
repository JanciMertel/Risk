var Mongoose = require('mongoose');
var database = require('../lib/database')
var server = require('../lib/Server')
var LobbySchema = new Mongoose.Schema({
    id : { type : String }  // room id in io terminology
});

LobbySchema.methods.getSockets = function() {
    return server.io.sockets.clients(this.id)
};

var Lobby = database.connection.model('Lobby', LobbySchema);
