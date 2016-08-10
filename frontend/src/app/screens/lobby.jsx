var React = require('react')
var ReactDOM = require('react-dom')

var LobbyGamesWrapper = require('../lobby/gameswrapper.jsx')
var LobbyProfile = require('../lobby/profile.jsx')

class LobbyScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this

    return (
      <div id="lobby-wrapper" style={this.wrapperStyle()}>
        <div style={this.styleGameWrapper()}>
          <LobbyGamesWrapper />
        </div>
        <div style={this.styleProfileWrapper()}>
          <LobbyProfile />
        </div>
      </div>
    )
  }

  wrapperStyle () {
    return {
      width: this.props.display.w,
      height: this.props.display.h,
    }
  }

  styleGameWrapper () {
    return {
      width: this.props.display.w,
      height: '80%'
    }
  }

  styleProfileWrapper () {
    return {
      width: this.props.display.w,
      height: '20%'
    }
  }
}


module.exports = LobbyScreen
