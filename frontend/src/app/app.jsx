var React = require('react')
var ReactDOM = require('react-dom')
var _ = require('lodash')
var Base = require('./base.js')
var MapHelper = require('./helpers/map.js')
var connection = require('./helpers/connection.js')

var Screens = require('./enums/screens.js')
var Actions = require('./enums/actions.js')

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
      },
      maps: [],
      matches: []
    }

    setInterval(this.updateServerData.bind(this), 5000)

    this.loadMap()
  }

  updateServerData () {
    var that = this
    if (connection.socket) {
      connection.emit(Actions['LOBBYFIND'], {}, function(matches){
        that.setState({
          matches: matches
        })
      })
      connection.emit(Actions['LOBBYGETMAPS'], {}, function(maps){
        that.setState({
          maps: maps
        })
      })
    }
  }

  changeScreen (newScreen) {
    this.setState({screen: newScreen})
  }

  createMatch (matchObject) {
    connection.emit(Actions['LOBBYCREATE'], matchObject, function(response){
      console.log('game created')
    })
  }

  joinMatch (matchId) {
    connection.emit(Actions['LOBBYJOIN'], {matchId: matchId}, function(response){
      console.log('game joined')
    })
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  loginUser () {
    connection.connect();
    connection.bindEvents();

    this.updateServerData()
    this.changeScreen('lobby')
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
      function(xhr) {
        console.log(xhr)
      }
    )
  }

  render () {
    var that = this
    var propsObject = this.state
    propsObject.app = this
    var screen = React.createElement(Screens[this.state.screen], propsObject);

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
