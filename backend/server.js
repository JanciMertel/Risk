
const server = require('./lib/Server');

server.database.connect().then(() => {
    server.start();
});
