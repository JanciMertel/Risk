// get models
var database = require('./core/lib/database')
database.connect();

//models
require('./core/models/Session')

// sockets
var Socket = require('./core/lib/Socket');
var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(socket){
    socket.socket = new Socket(socket);
});
server.listen(3000);