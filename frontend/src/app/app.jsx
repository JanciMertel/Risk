var React = require('react')
var ReactDOM = require('react-dom')
var _ = require('lodash')

var Stage = require('react-konva').Stage

var screens = require('./enums/screens.js')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {
        gridH: 10,
        gridW: 10
      },
      screen: 'game'
    }
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
