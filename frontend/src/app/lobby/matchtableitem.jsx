var React = require('react')
var ReactDOM = require('react-dom')

class LobbyMatchTableItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this
    var game = this.props.game

    return (
      <tr onClick={this.props.gameClicked.bind(this, game.id)}>
        <td >{game._id}</td>
      </tr>
    )
  }
  // <td>{game.name}</td>
  // <td>{game.playersNow + '/' + game.playersAll}</td>
}

module.exports = LobbyMatchTableItem
