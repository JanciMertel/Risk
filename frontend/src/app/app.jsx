var React = require('react')
var ReactDOM = require('react-dom')

class App extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }

  render () {
    return (<div>{'Hello World'}</div>)
  }
}


module.exports = App
