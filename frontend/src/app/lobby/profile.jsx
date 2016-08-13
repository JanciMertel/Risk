var React = require('react')
var ReactDOM = require('react-dom')

class LobbyProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h4>PROFILE</h4>
        <b>hello player</b>
      </div>
    )
  }

}

module.exports = LobbyProfile
