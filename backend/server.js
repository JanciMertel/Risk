
const server = require('./lib/Server');

server.database.connect().then(() => {
    console.log('Server starting');
    server.start();
});
