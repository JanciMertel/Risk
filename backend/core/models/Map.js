var Mongoose = require('mongoose');
var database = require('../lib/database')
var server = require('../lib/Server')

var ObjectId = Mongoose.Schema.Types.ObjectId;
var Mixed = Mongoose.Schema.Types.Mixed;

var MapSchema = new Mongoose.Schema({
    id : { type : ObjectId },
    name : { type: String },
    public: { type: Boolean },
    data : { type : Mixed }
});

module.exports = Mongoose.model('Map', MapSchema);
