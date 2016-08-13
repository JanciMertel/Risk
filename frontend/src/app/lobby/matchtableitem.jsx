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
      <tr onClick={this.props.gameClicked.bind(this, game.id)} style={this.styleTr()}>
        <td style={this.styleTd()}>{game._id}</td>
      </tr>
    )
  }
  // <td style={this.styleTd()}>{game.name}</td>
  // <td style={this.styleTd()}>{game.playersNow + '/' + game.playersAll}</td>

  styleTr () {
    var color = 'white'
    if (this.props.game.selected) {
      color = 'lightblue'
    }
    return {
      backgroundColor: color
    }
  }

  styleTd () {
    return {
      textAlign: 'center'
    }
  }
}

module.exports = LobbyMatchTableItem
