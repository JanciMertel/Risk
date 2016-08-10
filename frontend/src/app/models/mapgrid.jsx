var React = require('react')
var ReactDOM = require('react-dom')

var Group = require('react-konva').Group
var Hex = require('./hex.jsx')
var EmptyHex = require('./emptyhex.jsx')

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

                var hexagonClick = that.hexagonClicked.bind(this, index)

                var size = 55
                var sizeM = size - 7
                var y = 100 + r*sizeM
                var x = 100 + c*size
                if (r%2){
                  x += sizeM/2 + 4
                }

                if (hex){
                  if (hex.continent) {
                    return (
                      <Hex
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
                  }else{
                    return (
                      <EmptyHex
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
                  }
                }
              })
            )
          })
        }
      </Group>
    )
  }
}

module.exports = MapGrid
