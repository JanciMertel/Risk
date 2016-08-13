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
      <div id="lobby-wrapper" style={this.styleWrapper()} className="row medium-uncollapse large-collapse" >
        <div className="medium-12 columns">

          <div className="row">
            <div className="medium-8 columns">
              <LobbyMatchesTable
                gamesList={that.props.matches}
                gameClicked={that.gameClicked.bind(this)}
              />
            </div>
            <div className="medium-4 columns">
              <LobbyMatchBuilder />
            </div>

          </div>

          <div className="row">
            <div className="medium-8 columns">
              <LobbyMatchPreview
                selectedGame={that.getSelectedGame()}
              />
            </div>
            <div className="medium-4 columns">
              <LobbyProfile />
            </div>
          </div>

        </div>
      </div>
    )
  }

  styleWrapper () {
    return {
      paddingTop: '5em'
    }
  }

}


module.exports = LobbyScreen
