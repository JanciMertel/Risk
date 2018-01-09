const Sequelize = require('sequelize');
const DefaultModel = require('./DefaultModel');
var database = require('../lib/database')
var bcrypt   = require('bcrypt-nodejs');

class User extends DefaultModel {
  static init(sequelize) {
    return super.init({
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, { sequelize })
  };

  static generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };
}

module.exports = User;
