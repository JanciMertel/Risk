var React = require('react')
var ReactDOM = require('react-dom')

var MapHelper = require('../helpers/map.js')
var Konva = require('react-konva')
var Hexagon = require('./hexagon.jsx')
var Counter = require('./counter.jsx')
var Group = require('react-konva').Group

class Hex extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    var that = this
    return (
      <Group onClick={this.props.handleClick.bind(that.props.id)}>
        <Hexagon {...this.props} />
        <Counter {...this.props} />
      </Group>
    )
  }
}

module.exports = Hex
