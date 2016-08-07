var React = require('react')
var ReactDOM = require('react-dom')

var Group = require('react-konva').Group
var Hexagon = require('../models/hexagon.jsx')

class MapGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  hexagonClicked (i) {
    console.log(i)
  }

  render () {
    var that = this

    return (
      <Group>
        {
          Array(that.props.map.height).fill().map(function(row, r){
            return(
              Array(that.props.map.width).fill().map(function(column, c){
                var index = r + '-' + c
                var hex = _.find(that.props.hexes, {index: index})

                var hexagonClick = that.hexagonClicked.bind(this,index)

                var size = 50
                var y = 100 + r*size*0.9
                var x = 100 + c*size
                if (r%2){
                  x += size/2
                }

                return (
                  <Hexagon
                    key={index}
                    id={index}
                    x={x}
                    y={y}
                    h={size}
                    w={size}
                    hex={hex}
                    handleClick={hexagonClick}
                  />
                )
              })
            )
          })
        }
      </Group>
    )
  }
}

module.exports = MapGrid
