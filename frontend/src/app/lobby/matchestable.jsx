var React = require('react')
var ReactDOM = require('react-dom')

var LobbyMatchTableItem = require('./matchtableitem.jsx')

class LobbyMatchesTable extends React.Component {
  constructor(props) {
    super(props);
  }

  handleGameClicked (gameIndex) {
    this.props.gameClicked(gameIndex)
  }

  render () {
    var that = this

    return (
      <table style={this.styleTable()}>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>players</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.gamesList.map(function(game, g){
              var gameClicked = that.handleGameClicked.bind(that, game.id)
              return(
                <LobbyMatchTableItem key={g} game={game} gameClicked={gameClicked}/>
              )
            })
          }
        </tbody>
      </table>
    )

  }

  styleTable () {
    return {
      width: '100%',
      padding: '10px'
    }
  }
}

module.exports = LobbyMatchesTable
