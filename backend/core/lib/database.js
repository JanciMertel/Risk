/**
 * Database module - without prototyping
 */

var Mongoose = require('mongoose');

function Database()
{
    this.connection = null;
    this.connected = false;

    this.connect = function()
    {
        if(!this.connection) {
            Mongoose.connect('mongodb://188.166.44.50/risk');
            this.connection = Mongoose.connection;
            Mongoose.connection.once('open', function() {
                this.connected = true;
                console.log('Database connected')
            });
            Mongoose.connection.on('error', function()
            {
                this.connected = false;
                console.log('Database disconnected')
            });
        }
    }
}

var db = new Database()
module.exports = db;
