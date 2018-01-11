const Sequelize = require('sequelize');
const DefaultModel = require('./DefaultModel');

class Map extends DefaultModel {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      public: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      data: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    }, { sequelize })
  };
}

module.exports = Map;
