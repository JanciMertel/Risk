var React = require('react')
var ReactDOM = require('react-dom')
var _ = require('lodash')
var Base = require('./base.js')

var Stage = require('react-konva').Stage

var screens = require('./enums/screens.js')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapName: 'map1',
      map: false,
      screen: 'game'
    }

    this.loadMap()
  }

  loadMap () {
    var mapPath = 'maps/' + this.state.mapName + '.JSON'

    Base.loadJSON(
      mapPath,
      function(data) {console.log(data)},
      function(xhr) {console.log(xhr)}
    )
  }

  render () {
    var that = this
    var screen = React.createElement(screens[this.state.screen], that.state);

    return (
      <Stage width={700} height={700}>
        {
          screen
        }
      </Stage>
    )
  }
}

module.exports = App
