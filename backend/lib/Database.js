/**
 * Database module - without prototyping
 */

import * as Mongoose from 'mongoose';
import config from '../config';

const DB_TYPE_SQLITE = 1;
const DB_TYPE_MONGO = 2;

class Database {
  config = null;
  connection = null;
  connected = false;

  getType() {
    if (this.config.type === 'sqlite') {
      return DB_TYPE_SQLITE;
    } else {
      return DB_TYPE_MONGO;
    }
  }

  constructor(config) {
      this.config = config;
  }

  connect(cb) {
        if(!this.connection) {
            Mongoose.connect('mongodb://188.166.44.50/risk');
            this.connection = Mongoose.connection;
            Mongoose.connection.once('open', function() {
                this.connected = true;
                console.log('Database connected')
                cb();
            });
            Mongoose.connection.on('error', function()
            {
                this.connected = false;
                console.log('Database disconnected')
            });
        }
    }
}

const db = new Database(config.database);
export default db;
