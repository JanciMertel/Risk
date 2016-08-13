var React = require('react')
var ReactDOM = require('react-dom')

class LobbyMatchBuilder extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this

    return (
      <div style={this.styleBuilder()}>
        <h4> here comes the game creator</h4>
      </div>
    )

  }

  styleBuilder () {
    return {
      padding: '15px'
    }
  }
}

module.exports = LobbyMatchBuilder
