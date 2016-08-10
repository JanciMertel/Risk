var React = require('react')
var ReactDOM = require('react-dom')
var _ = require('lodash')

var LobbyGamesTable = require('./gamestable.jsx')
var LobbyGamePreview = require('./gamepreview.jsx')
var LobbyGameBuilder = require('./gamebuilder.jsx')

class LobbyGamesWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperBorder = '2px solid black'

    this.state = {
      lameGameList: [
        {'id': 1, 'map': 'map1', 'name': 'ahoj', 'playersNow': 1, 'playersAll': 7, selected: true},
        {'id': 2, 'map': 'map1', 'name': 'bla', 'playersNow': 3, 'playersAll': 7, selected: false},
        {'id': 3, 'map': 'map1', 'name': 'blabla', 'playersNow': 2, 'playersAll': 7, selected: false},
        {'id': 4, 'map': 'map1', 'name': 'only PRO', 'playersNow': 5, 'playersAll': 7, selected: false},
        {'id': 5, 'map': 'map1', 'name': 'only NOOBS', 'playersNow': 6, 'playersAll': 7, selected: false},
      ]
    }

  }

  gameClicked (id, e) {

    this.state.lameGameList.map(function(game, g){
      game.selected = false
    })

    this.findGameById(id).selected = true
    this.setState(this.state)
  }

  findGameById (id) {
    return _.find(this.state.lameGameList, {id: id})
  }

  getSelectedGame () {
    return _.find(this.state.lameGameList, {selected: true})
  }

  render () {
    var that = this


    return (
      <div style={this.styleWrapper()}>
        <div style={this.styleTableWrapper()}>
          <LobbyGamesTable gamesList={that.state.lameGameList} gameClicked={that.gameClicked.bind(this)}/>
        </div>
        <div style={this.stylePreviewWrapper()}>
          <LobbyGamePreview selectedGame={that.getSelectedGame()} />
        </div>
        <div style={this.styleBuilderWrapper()}>
          <LobbyGameBuilder />
        </div>
      </div>
    )
  }

  styleWrapper () {
    return {
      width: '100%',
      height: '100%'
    }
  }

  styleTableWrapper () {
    return {
      position: 'absolute',
      top: '1%',
      width: '66%',
      height: '47%',
      border: this.wrapperBorder
    }
  }

  stylePreviewWrapper () {
    return {
      position: 'absolute',
      top: '50%',
      width: '66%',
      height: '29%',
      border: this.wrapperBorder
    }
  }

  styleBuilderWrapper () {
    return {
      position: 'absolute',
      right: '1%',
      top: '1%',
      width: '30%',
      height: '78%',
      border: this.wrapperBorder
    }
  }
}

module.exports = LobbyGamesWrapper
