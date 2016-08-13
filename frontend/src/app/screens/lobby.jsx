var React = require('react')
var ReactDOM = require('react-dom')

var LobbyMatchesTable = require('../lobby/matchestable.jsx')
var LobbyMatchPreview = require('../lobby/matchpreview.jsx')
var LobbyMatchBuilder = require('../lobby/matchbuilder.jsx')
var LobbyProfile = require('../lobby/profile.jsx')

var connection = require('../helpers/connection.js')
var Actions = require('../enums/actions.js')

var F = require('react-foundation')

class LobbyScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMatch: false
    }
  }


  gameClicked (id, e) {

    this.props.matches.lameGameList.map(function(game, g){
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
      <div id="lobby-wrapper" className="row" >
        <div>
          <LobbyMatchesTable
            gamesList={that.props.matches}
            gameClicked={that.gameClicked.bind(this)}
          />
        </div>
        <div>
          <LobbyMatchPreview
            selectedGame={that.getSelectedGame()}
          />
        </div>
        <div>
          <LobbyMatchBuilder />
        </div>
        <div>
          <LobbyProfile />
        </div>
      </div>
    )
  }

}


module.exports = LobbyScreen
