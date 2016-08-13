var React = require('react')
var ReactDOM = require('react-dom')

var connection = require('../helpers/connection.js')
var Actions = require('../enums/actions.js')

var F = require('react-foundation')

class LobbyMatchBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allMaps: [],
      matchName: '',
      noPlayers: 4,
      aiBots: true,
      private: false,
      map: ''
    }
    this.getMaps()
  }

  getMaps () {
    connection.emit(Actions['LOBBYGETMAPS'], {}, function(maps){
      that.setState({
        allMaps: maps
      })
    })
  }

  handleChangeValue (parameter, e) {
    console.log(parameter)
    var newState = {}
    newState[parameter] = e.target.value
    this.setState(newState)
  }

  handleCreateMatch () {
    console.log(this.state)
    var matchObject = {
      map: this.state.map,
      slots: [],
      maxPlayers: this.state.noPlayers,
      private: this.state.private,
      aiBotsAllowed: this.state.aiBots
    }

    connection.emit(Actions['LOBBYCREATE'], matchObject, function(response){
      console.log('game created')
      console.log(response)
    })

  }

  render () {
    var that = this

    return (
      <div style={this.styleBuilder()}>
        <h4> MATCH BUILDER</h4>

        <label>
          Match name:
          <input
            type="text"
            name="matchName"
            value={this.state.matchName}
            onChange={this.handleChangeValue.bind(this, 'matchName')}
          />
        </label>

        <label>
          Number of players:
          <input
            type="number"
            name="noPlayers"
            value={this.state.noPlayers}
            onChange={this.handleChangeValue.bind(this, 'noPlayers')}
          />
        </label>

        <label>
          Computer Bots allowed:
          <F.Switch
            name="aiBots"
            active={{ text: 'yes' }}
            inactive={{ text: 'no' }}
            input={
              {
              defaultChecked: that.state.aiBots
              }
            }
            onChange={this.handleChangeValue.bind(this, 'aiBots')}
          />
        </label>

        <label>
          Private:
          <F.Switch
            name="private"
            active={{ text: 'yes' }}
            inactive={{ text: 'no' }}
            input={
              {
              defaultChecked: that.state.private
              }
            }
            onChange={this.handleChangeValue.bind(this, 'private')}
          />
        </label>

        <label>Map:
          <select

          >
            {
              this.state.allMaps.map(function(map, m){
                return(
                  <option
                    value={map.name}
                  >Husker
                  </option>
                )
              })
            }
          </select>
        </label>

        <F.Button onClick={this.handleCreateMatch.bind(this)} color={F.Colors.SUCCESS}>Create Match</F.Button>

      </div>
    )

  }

  styleBuilder () {
    return {

    }
  }
}

module.exports = LobbyMatchBuilder
