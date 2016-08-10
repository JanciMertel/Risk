var Mongoose = require('mongoose');
var database = require('../lib/database')
var bcrypt   = require('bcrypt-nodejs');

var ObjectId = Mongoose.Schema.Types.ObjectId;

var UserSchema = new Mongoose.Schema({
    id : { type : ObjectId },  // room id in io terminology
    username : { type : String},
    password : { type : String }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = Mongoose.model('User', UserSchema);
