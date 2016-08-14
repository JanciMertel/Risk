var React = require('react')
var ReactDOM = require('react-dom')


class GameLogPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div style={this.styleWrapper()}>
        <h4>Logs</h4>
        <div>
        {
          this.props.logs.map(function(log, l){
            return (
              <div key={l}>
                {log.text}
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }

  styleWrapper () {
    return {
      height: '100px',
      overflow: 'hidden'
    }
  }

}

module.exports = GameLogPanel
