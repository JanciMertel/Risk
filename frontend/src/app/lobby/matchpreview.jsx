var React = require('react')
var ReactDOM = require('react-dom')

class LobbyMatchPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  handleJoinClick () {
    console.log(this)
  }

  render () {
    var that = this
    var game = this.props.selectedGame

    if (game){
      return (
        <div style={this.stylePreview()}>
          <h4>{'GAME PREVIEW  ' + game._id}</h4>
          <dl>
          </dl>
          <button onClick={this.handleJoinClick.bind(this)}>JOIN</button>
        </div>
      )

    }else{
      return (
        <div style={this.stylePreview()}>
          <h2>{'NO GAME SELECTED'}</h2>
        </div>
      )
    }

  }

  stylePreview () {
    return {
      padding: '15px'
    }
  }
}

// <dt>map</dt><dd>{game.map}</dd>
// <dt>name</dt><dd>{game.name}</dd>
// <dt>players</dt><dd>{game.playersNow}</dd>
module.exports = LobbyMatchPreview
