var React = require('react')
var ReactDOM = require('react-dom')

var Group = require('react-konva').Group
var Rect = require('react-konva').Rect
var Text = require('react-konva').Text

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this

    return (
      <Group
        onClick={this.props.handleClick}>
        <Rect
          x={this.props.x}
          y={this.props.y}
          height={this.props.h}
          width={this.props.w}
          fill={this.props.fill}
          stroke={0}
        />
        <Text
          x={this.props.x}
          y={this.props.y + this.props.h/4}
          width={this.props.w}
          text={this.props.text}
          fontSize={15}
          align='center'
          fill={this.props.textColor}
        />
      </Group>
    )
  }
}

module.exports = Button
