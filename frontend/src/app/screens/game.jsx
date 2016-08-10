var React = require('react')
var ReactDOM = require('react-dom')

var Stage = require('react-konva').Stage
var Layer = require('react-konva').Layer
var MapGrid = require('../models/mapgrid.jsx')

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this

    return (
      <Stage
        width={this.props.display.w}
        height={this.props.display.h}
      >
        <Layer>
          <MapGrid {...this.props} />
        </Layer>
      </Stage>
    )
  }
}

module.exports = GameScreen
