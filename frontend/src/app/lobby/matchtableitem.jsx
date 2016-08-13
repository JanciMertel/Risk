var React = require('react')
var ReactDOM = require('react-dom')
var _ = require('lodash')

class LobbyMatchTableItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this
    var match = this.props.match

    return (
      <tr onClick={this.props.gameClicked.bind(this, match.id)}>
        <td >{match.name}</td>
        <td >{match.state}</td>
        <td >{this.props.map}</td>
        <td >{match.slots.length + '/' + match.maxPlayers}</td>
      </tr>
    )
  }
}

module.exports = LobbyMatchTableItem
