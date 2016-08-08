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
    return (
      <Group>
        <Hexagon {...this.props} />
        <Counter {...this.props} />
      </Group>
    )
  }
}

module.exports = Hex
