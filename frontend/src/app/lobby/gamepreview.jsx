var React = require('react')
var ReactDOM = require('react-dom')

class LobbyGamePreview extends React.Component {
  constructor(props) {
    super(props);
  }

  handleJoinClick () {
    console.log(this)
  }

  render () {
    var that = this
    var game = this.props.selectedGame

    return (
      <div style={this.stylePreview()}>
        <h2>{'GAME PREVIEW  ' + game.id}</h2>
        <dl>
          <dt>map</dt><dd>{game.map}</dd>
          <dt>name</dt><dd>{game.name}</dd>
          <dt>players</dt><dd>{game.playersNow}</dd>
        </dl>
        <button onClick={this.handleJoinClick.bind(this)}>JOIN</button>
      </div>
    )
  }

  stylePreview () {
    return {
      padding: '15px'
    }
  }
}

module.exports = LobbyGamePreview
