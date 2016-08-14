var React = require('react')
var ReactDOM = require('react-dom')

var F = require('react-foundation')

var PlayerInfo = require('./playerinfo.jsx')

class GamePlayersPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this
    return (
      <div style={this.styleWrapper()}>
        <h4>Players</h4>
        <F.Row className="display-end">
        {
          this.props.players.map(function(player, p){
            return (
              <PlayerInfo key={p} player={player} no={p} noPlayers={that.props.players.length} />
            )
          })
        }
        </F.Row>
      </div>
    )
  }

  styleWrapper () {
    return {
      height: '100px',
      overflow: 'hidden'
    }
  }

}

module.exports = GamePlayersPanel
