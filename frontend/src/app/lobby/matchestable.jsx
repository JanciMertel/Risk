var React = require('react')
var ReactDOM = require('react-dom')

var LobbyMatchTableItem = require('./matchtableitem.jsx')

class LobbyMatchesTable extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMatchClicked (gameIndex) {
    this.props.matchClicked(gameIndex)
  }

  render () {
    var that = this

    return (
      <div>
        <h4>MATCHES LIST</h4>
        <table className="table-scroll">
          <thead>
            <tr>
              <th>name</th>
              <th>state</th>
              <th>map</th>
              <th>players</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.matchesList.map(function(match, g){
                var gameClicked = that.handleMatchClicked.bind(that, match._id)
                var matchMapName = ''
                if (that.props.maps.length) {
                  matchMapName = _.find(that.props.maps, {'_id': match.map}).name
                }
                return(
                  <LobbyMatchTableItem map={matchMapName} key={g} match={match} gameClicked={gameClicked}/>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )

  }

}

module.exports = LobbyMatchesTable
