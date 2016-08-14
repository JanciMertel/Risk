var React = require('react')
var ReactDOM = require('react-dom')
var _ = require('lodash')

var Base = require('./base.js')
var MapHelper = require('./helpers/map.js')
var connection = require('./helpers/connection.js')

var Screens = require('./enums/screens.js')
var Actions = require('./enums/actions.js')
var Responses = require('./enums/responses.js')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      // testing purposes
      match: {
        name: 'random_game_123',
        mapName: '',
        slots: [
          {id: '', username: 'player 1', type: 'player', admin: true},
          {id: '', username: 'player 2', type: 'player', admin: false},
          {id: '', username: 'player 3', type: 'player', admin: false},
          {id: '', username: 'AI 1', type: 'ai', admin: false},
          {id: '', username: 'AI 2', type: 'ai', admin: false}
        ],
        chats: [
          {author: 'player1', message: 'hi all', time: ''},
          {author: 'player2', message: 'go fuck yourself', time: ''}
        ],
        logs: [
          {message: 'match created', time: ''},
        ],
        map: false

      },

      screen: 'game',

      display: {
        w: window.innerWidth,
        h: window.innerHeight
      },
      maps: [],
      matches: []
    }

    setInterval(this.updateServerData.bind(this), 5000)
  }

  updateServerData () {
    var that = this
    if (connection.socket) {
      connection.emit(Actions['LOBBYFIND'], {}, function(matches){
        that.setState({
          matches: matches.data
        })
      })
      connection.emit(Actions['LOBBYGETMAPS'], {}, function(maps){
        that.setState({
          maps: maps.data
        })
      })
    }
  }

  prepareGame (gameData) {
    console.log(gameData)
    this.changeScreen ('game')

  }

  changeScreen (newScreen) {
    this.setState({screen: newScreen})
  }

  createMatch (matchObject) {
    var that = this
    connection.emit(Actions['LOBBYCREATE'], matchObject, function(response){
      // response.status
      // response.message
      // response.data -> lobby
      //   response.data.map.data -> JSON map
      if (response.message == Responses['OK']){
        that.prepareGame(response.data)
        console.log('game created')
      }
    })
  }

  joinMatch (matchId) {
    var that = this
    connection.emit(Actions['LOBBYJOIN'], {id: matchId}, function(response){
      console.log(response)
      if (response.message == Responses['OK']){
        that.prepareGame(response.data)
        console.log('game joined')
      }
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
