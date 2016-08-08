var React = require('react')
var ReactDOM = require('react-dom')

var MapHelper = require('../helpers/map.js')
var Circle = require('react-konva').Circle
var Group = require('react-konva').Group
var Text = require('react-konva').Text

class Counter extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Group>
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={this.props.w/4}
          fill={'white'}
          stroke={'black'}
          strokeWidth={4}
        />
        <Text
          x={this.props.x-15}
          y={this.props.y - this.props.w/10}
          text={parseInt(Math.random() * 20)}
          fontFamily='Arial black'
          width={30}
          fontSize={10}
          align='center'
        />
      </Group>
    )
  }
}

module.exports = Counter
