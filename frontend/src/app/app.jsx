var React = require('react')
var ReactDOM = require('react-dom')
var _ = require('lodash')
var Base = require('./base.js')
var MapHelper = require('./helpers/map.js')

var screens = require('./enums/screens.js')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapName: 'map1',
      map: false,
      screen: 'login',
      display: {
        w: window.innerWidth,
        h: window.innerHeight
      }
    }

    this.loadMap()
  }

  changeScreen(newScreen) {
    this.setState({screen: newScreen})
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  handleResize (e) {

    this.setState(
      {
        display: {
          w: window.innerWidth,
          h: window.innerHeight
        }
      }
    )
  }

  loadMap () {
    var that = this
    var mapPath = 'maps/' + this.state.mapName + '.JSON'

    Base.loadJSON(
      mapPath,
      function(data) {
        that.setState(
          {
            map: data,
            hexes: MapHelper.getHexes(data)
          }
        )
      },
      function(xhr) {console.log(xhr)}
    )
  }

  render () {
    var that = this
    var propsObject = this.state
    propsObject.app = this
    var screen = React.createElement(screens[this.state.screen], propsObject);

    return (
      <div id="canvas-wrapper">
        {
          screen
        }
      </div>
    )
  }
}

module.exports = App
