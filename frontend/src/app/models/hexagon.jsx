var React = require('react')
var ReactDOM = require('react-dom')

var Rect = require('react-konva').Rect

class Hexagon extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: 'green'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('clicked')
  }

  render () {
    return (
      <Rect
        x={10} y={10} width={50} height={50}
        fill={this.state.color}
        shadowBlur={10}
        onClick={this.handleClick}
      />
    )
  }
}

module.exports = Hexagon
