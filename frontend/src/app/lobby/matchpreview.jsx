var React = require('react')
var ReactDOM = require('react-dom')

var F = require('react-foundation')
var connection = require('../helpers/connection.js')
var Actions = require('../enums/actions.js')

class LobbyMatchPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  handleJoinClick () {
    this.props.matchJoin(this.props.selectedMatch._id)
  }

  render () {
    var that = this
    var selectedMatch = this.props.selectedMatch

    if (selectedMatch){
      return (
        <div style={this.stylePreview()}>
          <h4>{'GAME PREVIEW  ' + selectedMatch.name}</h4>
          <dl>
            <dt>map</dt><dd>{this.props.map.name}</dd>
            <dt>state</dt><dd>{selectedMatch.state}</dd>
            <dt>AI bots enabled</dt><dd>{selectedMatch.botsEnables}</dd>
            <dt>max players enabled</dt><dd>{selectedMatch.maxPlayers}</dd>
          </dl>
          <F.Button
            onClick={this.handleJoinClick.bind(this)}
            color={F.Colors.WARNING}
          >
            Join Match
          </F.Button>
        </div>
      )

    }else{
      return (
        <div style={this.stylePreview()}>
          <h2>{'NO GAME SELECTED'}</h2>
        </div>
      )
    }

  }

  stylePreview () {
    return {
      padding: '15px'
    }
  }
}


module.exports = LobbyMatchPreview
