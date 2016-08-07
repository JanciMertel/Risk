var React = require('react')
var ReactDOM = require('react-dom')

var Stage = require('react-konva').Stage
var Layer = require('react-konva').Layer
var Hexagon = require('./models/hexagon.jsx')

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Stage width={700} height={700}>
        <Layer>
          <Hexagon/>
        </Layer>
      </Stage>
    )
  }
}

module.exports = App
