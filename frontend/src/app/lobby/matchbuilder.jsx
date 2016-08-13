var React = require('react')
var ReactDOM = require('react-dom')

var F = require('react-foundation')

class LobbyMatchBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchName: '',
      noPlayers: 4,
      aiBots: true,
      private: false,
      map: false
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      maps: nextProps.maps
    })
  }

  handleChangeValue (parameter, e) {
    var newState = {}
    newState[parameter] = e.target.value
    this.setState(newState)
  }

  handleCreateMatch () {
    var matchObject = {
      map: this.state.map,
      name: this.state.matchName,
      maxPlayers: this.state.noPlayers,
      private: this.state.private,
      botsAllowed: this.state.aiBots
    }
    this.props.matchCreate(matchObject)

  }

  render () {
    var that = this

    var mapOptions = []

    mapOptions.push(
      <option
        key={9999}
        value={false}
      >select map
      </option>
    )

    this.props.maps.map(function(map, m){
      mapOptions.push(
        <option
          key={m}
          value={map._id}
        >{map.name}
        </option>
      )
    })

    return (
      <div style={this.styleBuilder()}>
        <h4> MATCH BUILDER</h4>

        <label key="1">
          Match name:
          <input
            type="text"
            name="matchName"
            value={this.state.matchName}
            onChange={this.handleChangeValue.bind(this, 'matchName')}
          />
        </label>

        <label key="2">
          Number of players:
          <input
            type="number"
            name="noPlayers"
            value={this.state.noPlayers}
            onChange={this.handleChangeValue.bind(this, 'noPlayers')}
          />
        </label>

        <label key="3">
          Computer Bots allowed:
          <F.Switch
            name="aiBots"
            onChange={this.handleChangeValue.bind(this, 'aiBots')}
          />
        </label>

        <label key="4">
          Private:
          <F.Switch
            name="private"
            onChange={this.handleChangeValue.bind(this, 'private')}
          />
        </label>

        <label key="5">
          Map:
          <select
            name="map"
            onChange={this.handleChangeValue.bind(this, 'map')}
          >
            {
              mapOptions
            }
          </select>
        </label>

        <F.Button
          onClick={this.handleCreateMatch.bind(this)}
          color={F.Colors.SUCCESS}
        >
          Create Match
        </F.Button>

      </div>
    )

  }

  styleBuilder () {
    return {

    }
  }
}

module.exports = LobbyMatchBuilder
