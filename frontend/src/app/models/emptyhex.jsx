var React = require('react')
var ReactDOM = require('react-dom')

var MapHelper = require('../helpers/map.js')
var Konva = require('react-konva')
var Hexagon = require('./hexagon.jsx')
var Group = require('react-konva').Group

var RegularPolygon = require('react-konva').RegularPolygon

class Hex extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    var style = MapHelper.defaultHexStyle()
    return (
      <RegularPolygon
        x={this.props.x}
        y={this.props.y}
        width={this.props.w}
        height={this.props.h}
        sides={6}
        strokeWidth={style.width}
        stroke={style.color}
        fill={style.fill}
      />
    )
  }
}

module.exports = Hex
