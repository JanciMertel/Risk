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

  handleMatchCreate (matchObject, e) {
    this.props.app.createMatch(matchObject)
  }

  handleMatchJoin (matchId, e) {
    this.props.app.joinMatch(matchId)
  }

  gameClicked (id, e) {
    var selectedMatch = this.findGameById(id)

    this.setState({
      selectedMatch: selectedMatch
    })
  }

  findGameById (id) {
    return _.find(this.props.matches, {_id: id})
  }

  findMapById (id) {
    return _.find(this.props.maps, {'_id': id})
  }


  render () {
    var that = this
    var selectedMap = that.findMapById(that.state.selectedMatch.map)
    
    return (
      <div id="lobby-wrapper" style={this.styleWrapper()} className="row medium-uncollapse large-collapse" >
        <div className="medium-12 columns">

          <div className="row">
            <div className="medium-8 columns">
              <LobbyMatchesTable
                matchesList={that.props.matches}
                selectedMatch={this.state.selectedMatch}
                maps={that.props.maps}
                matchClicked={that.gameClicked.bind(this)}
              />
            </div>
            <div className="medium-4 columns">
              <LobbyMatchBuilder
                maps={this.props.maps}
                matchCreate={this.handleMatchCreate.bind(this)}
              />
            </div>

          </div>

          <div className="row">
            <div className="medium-8 columns">
              <LobbyMatchPreview
                map={selectedMap}
                selectedMatch={this.state.selectedMatch}
                matchJoin={this.handleMatchJoin.bind(this)}
              />
            </div>
            <div className="medium-4 columns">
              <LobbyProfile user={this.props.user}/>
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
