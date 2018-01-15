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
        unique: true,
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

  validPassword(rawPassword) {
    return bcrypt.compareSync(rawPassword, this.password);
  };

  static auth(username, rawPassword) {
    return this.findOne({
      where: {
        username,
      }
    }).then((user) => {
      if (user && user.validPassword(rawPassword)) {
        return user;
      } else {
        return false;
      }
    });
  }
}

module.exports = User;
