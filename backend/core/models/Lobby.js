var Mongoose = require('mongoose');
var database = require('../lib/database')
var server = require('../lib/Server')

var ObjectId = Mongoose.Schema.Types.ObjectId;

var LobbySchema = new Mongoose.Schema({
    id : { type : ObjectId }  // room id in io terminology
});

LobbySchema.methods.getSockets = function() {
    return server.io.sockets.clients(this.id)
};

module.exports = Mongoose.model('Lobby', LobbySchema);