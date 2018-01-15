const Sequelize = require('sequelize');

class DefaulModel extends Sequelize.Model {
  index() {
    return this.findAll();
  }
}

module.exports = DefaulModel;
