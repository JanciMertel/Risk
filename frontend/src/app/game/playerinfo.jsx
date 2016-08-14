var React = require('react')
var ReactDOM = require('react-dom')

var F = require('react-foundation')

class GamePlayersPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this

    return (
      <F.Column isLast={that.props.no+1 == that.props.noPlayers} small={2} medium={1}>
        {that.props.player.username}
      </F.Column>
    )
  }

  styleWrapper () {
    return {
    }
  }

}

module.exports = GamePlayersPanel
