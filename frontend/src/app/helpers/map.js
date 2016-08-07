var _ = require('lodash')

var MapHelper = {

  defaultHexStyle () {
    return {
      color: 'grey'
    }
  },

  getHexes (map) {
    var hexes = []


    Array(map.height).fill().map(function(row, r){
      Array(map.width).fill().map(function(column, c){
        var index = r + '-' + c
        var hex = {
          x: c,
          y: r,
          index: index,
          region: false,
          continent: false
        }

        map.continents.map(function(continent, c){
          continent.regions.map(function(region, r){
            region.hexes.map(function(hexIndex, h){
              if (index == hexIndex){
                hex.region = region
                hex.continent = continent
              }
            })
          })
        })

        hexes.push(hex)
      })
    })

    return hexes
  }

}

module.exports = MapHelper
