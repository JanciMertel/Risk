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
          Array(that.props.map.gridH).fill().map(function(row, r){
            return(
              Array(that.props.map.gridW).fill().map(function(column, c){
                var index = r + '-' + c
                var hexagonClick = that.hexagonClicked.bind(this,index)

                var size = 50
                var y = 100 + r*size
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
                    color={'red'}
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
