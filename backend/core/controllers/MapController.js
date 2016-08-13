/**
 * MapController module - without prototyping
 */

var Mongoose = require('mongoose');

function MapController()
{
  this.index = function(data)
  {
    var Map = Mongoose.model('Map')
    return new Promise(function(resolve, reject)
    {
      Map.find(data, function(err, maps) {
        if (err) reject('Error in query!');
        resolve(maps);
      });
    });
  }
}

var mapController = new MapController()
module.exports = mapController;
