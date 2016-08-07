var React = require('react')
var ReactDOM = require('react-dom')

var Layer = require('react-konva').Layer
var MapGrid = require('../models/mapgrid.jsx')

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this

    return (
      <Layer>
        <MapGrid {...this.props} />
      </Layer>
    )
  }
}

module.exports = GameScreen
