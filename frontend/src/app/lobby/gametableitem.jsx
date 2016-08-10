var React = require('react')
var ReactDOM = require('react-dom')

class LobbyGameTableItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this
    var game = this.props.game

    return (
      <tr onClick={this.props.gameClicked.bind(this, game.id)} style={this.styleTr()}>
        <td style={this.styleTd()}>{game.id}</td>
        <td style={this.styleTd()}>{game.name}</td>
        <td style={this.styleTd()}>{game.playersNow + '/' + game.playersAll}</td>
      </tr>
    )
  }

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

module.exports = LobbyGameTableItem
