var Mongoose = require('mongoose');
var database = require('../lib/database')
var server = require('../lib/Server')

function makeName()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var ObjectId = Mongoose.Schema.Types.ObjectId;

var LobbySchema = new Mongoose.Schema({
    id : { type : ObjectId },  // room id in io terminology
    state : { type: String, enum: ['NEW', 'STARTED', 'EXPIRED'], default: 'NEW', required: true },
    name : { type: String },
    maxPlayers : { type: Number, default: 1, required: true },
    slots : { type : Array, required: true },
    botsEnables : { type: Boolean, default: true, required: true },
    map : { type: Mongoose.Schema.Types.ObjectId, ref: 'Map', required: true },
    private : {type: Boolean, default: false}
});

LobbySchema.methods.getSockets = function() {
    return server.io.sockets.clients(this.id)
};

LobbySchema.pre('save', function(next) {

  if(!this.name)
  {
    this.name = makeName();
  }
  next();

});

module.exports = Mongoose.model('Lobby', LobbySchema);
