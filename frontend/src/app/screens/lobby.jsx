var React = require('react')
var ReactDOM = require('react-dom')

var Layer = require('react-konva').Layer

class LobbyScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this

    return (
      <div>
        this is lobby
      </div>
    )
  }
}

module.exports = LobbyScreen
