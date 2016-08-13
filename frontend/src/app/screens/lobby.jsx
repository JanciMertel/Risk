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
    var selectedMatch = this.findGameById(id)
    console.log(selectedMatch)

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
              <LobbyMatchBuilder maps={this.props.maps} app={this.props.app} />
            </div>

          </div>

          <div className="row">
            <div className="medium-8 columns">
              <LobbyMatchPreview
                map={that.findMapById(this.state.selectedMatch.map)}
                selectedMatch={this.state.selectedMatch}
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
