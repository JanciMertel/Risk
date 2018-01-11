/**
 * Database module - without prototyping
 */
const Sequelize = require('sequelize');
const config = require('../config');
const path = require('path');
const fs = require('fs');

class Database {
  constructor(config) {
      this.config = config;
      this.models = {}; // empty now
      this.connection = new Sequelize('risk', null, null, {
          dialect: "sqlite",
          storage: './sqlite',
          operatorsAliases: false // sequelize bug - would show notice otherwise
      });
  }

  connect(cb) {
    return this.connection.authenticate().then(() => {
      this.models = Object.assign({}, ...fs.readdirSync(path.join(__dirname, '..', 'models'))
        .filter(file => file.indexOf(".") !== -1 && ['index.js', 'DefaultModel.js'].indexOf(file) === -1)
        .map((file) => {
          const model = require(path.join(__dirname, '..', 'models', file));
          // console.log(model.init(sequelize).tableName)
          return {
            [model.name]: model.init(this.connection),
          };
        })
      );

      for (const model of Object.keys(this.models)) {
        typeof this.models[model].associate === 'function' && this.models[model].associate(this.models);
      }

      return this.connection.sync().then(() => {
        return this.models.User.findAll().then((users) => {
          if(!users.length) {
            return this.models.User.create({
              username: 'test',
              password: this.models.User.generateHash('test'),
            });
          } else {
            return true;
          }
        })
      });
    });
  }
}

const db = new Database(config.database);
module.exports = db;
