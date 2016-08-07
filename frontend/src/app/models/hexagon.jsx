var React = require('react')
var ReactDOM = require('react-dom')

var MapHelper = require('../helpers/map.js')
var Konva = require('react-konva')
var RegularPolygon = require('react-konva').RegularPolygon

var colors = require('../enums/colors.js')

class Hexagon extends React.Component {
  constructor (props) {
    super(props);
  }

  style () {
    var hexStyle = MapHelper.defaultHexStyle()
    if (this.props.hex){
      if (this.props.hex.continent){
        hexStyle = {
          color: colors[this.props.hex.continent.properties['style'].color][this.props.hex.region.properties.regionColor]
        }
      }
    }

    return hexStyle
  }

  render () {
    var style = this.style()
    var that = this

    return (
      <RegularPolygon
        x={this.props.x}
        y={this.props.y}
        width={this.props.w}
        height={this.props.h}
        sides={6}
        fill={style.color}
        onClick={this.props.handleClick.bind(that.props.id)}
      />
    )
  }
}

module.exports = Hexagon
