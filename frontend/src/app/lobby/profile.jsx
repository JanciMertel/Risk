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
        <b>{this.props.user.username}</b>
      </div>
    )
  }

}

module.exports = LobbyProfile
