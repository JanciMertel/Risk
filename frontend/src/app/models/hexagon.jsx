var React = require('react')
var ReactDOM = require('react-dom')

var Konva = require('react-konva')
var RegularPolygon = require('react-konva').RegularPolygon

class Hexagon extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this
    return (
      <RegularPolygon
        x={this.props.x}
        y={this.props.y}
        width={this.props.w}
        height={this.props.h}
        sides={6}
        fill={this.props.color}
        onClick={this.props.handleClick.bind(that.props.id)}
      />
    )
  }
}

module.exports = Hexagon
