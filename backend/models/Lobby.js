
const Sequelize = require('sequelize');
const DefaultModel = require('./DefaultModel');
const server = require('../lib/Server');

class Lobby extends DefaultModel {
  static init(sequelize) {
    return super.init({
      state: {
        type:   Sequelize.ENUM,
        values: ['active', 'pending', 'deleted']
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      maxPlayers : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      map: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    }, {sequelize})
  };

  static makeName() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  getSockets() {
    return server.io.sockets.clients(this.id)
  };
}

module.exports = Lobby;
