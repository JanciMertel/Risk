var React = require('react')
var ReactDOM = require('react-dom')

var Stage = require('react-konva').Stage
var Layer = require('react-konva').Layer
var MapGrid = require('../models/mapgrid.jsx')

var F = require('react-foundation')
var Row = F.Row

var PlayersPanel = require('../game/playerspanel.jsx')
var ChatPanel = require('../game/chatpanel.jsx')
var LogsPanel = require('../game/logpanel.jsx')


class GameScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var that = this

    return (
      <div id="game-wrapper" style={this.styleWrapper()} className="row medium-uncollapse large-collapse" >
        <h2>{'GAME ' + this.props.match.name}</h2>

        <Row>
          <PlayersPanel players={this.props.match.slots} />
        </Row>

        <div id="stage-wrapper" style={this.styleStageWrapper()}>
          <Stage height={this.props.display.h - 300} >
            <Layer>
              <MapGrid {...this.props} />
            </Layer>
          </Stage>
        </div>

        <div className="row" style={this.styleBottomPanel()}>

          <div key="b1" className="large-6 columns">
            <ChatPanel chats={this.props.match.chats} />
          </div>

          <div key="b2" className="large-6 columns">
            <LogsPanel logs={this.props.match.logs} />
          </div>

        </div>
      </div>
    )
  }

  styleBottomPanel () {
    return {
      height: '100px',
      overflow: 'hidden'
    }
  }

  styleStageWrapper () {
    return {
      border: '2px solid black'
    }
  }

  styleWrapper () {
    return {
      paddingTop: '3em'
    }
  }
}

module.exports = GameScreen
