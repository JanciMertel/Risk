var React = require('react')
var ReactDOM = require('react-dom')


class GameChatPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div style={this.styleWrapper()}>
        <h4>Chat</h4>
        <div>
        {
          this.props.chats.map(function(chat, ch){
            return (
              <div key={ch}>
                {chat.author + ":" + chat.message}
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

module.exports = GameChatPanel
