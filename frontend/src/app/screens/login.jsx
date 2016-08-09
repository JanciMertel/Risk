var React = require('react')
var ReactDOM = require('react-dom')

var Layer = require('react-konva').Layer
var Button = require('../models/button.jsx')

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      pass: '',

      registerMail: '',
      registerLogin: '',
      registerPass: '',
      loginState: '',
      registerState: '',
    }
  }

  handleChangeValue (parameter, e) {
    var newState = {}
    newState[parameter] = e.target.value
    this.setState(newState)
  }

  doLogin () {
    // parameters validation
    console.log('login')
    this.props.app.changeScreen('lobby')
  }

  doRegister () {
    // email validation
    // loginname uniquity
    // password control
    // register on server
    console.log('register')
  }

  render () {
    var that = this

    var buttonW = 100
    var buttonH = 30


    return (
      <div id="login-wrapper">
        <h1>RISK GAME LOGIN PAGE</h1>
        <h2>please LOGIN </h2>
        <p>Login <input type="text" name="login" value={this.state.login} onChange={this.handleChangeValue.bind(this, 'login')} /> </p>
        <p>Pass: <input type="password" name="pass" value={this.state.pass} onChange={this.handleChangeValue.bind(this, 'pass')} /> </p>
        <button onClick={this.doLogin.bind(this)}>LOGIN</button>
        <p>{this.state.loginState}</p>

        <h2>...or REGISTER </h2>
        <p>Email <input type="text" name="register-mail" value={this.state.registerMail} onChange={this.handleChangeValue.bind(this, 'registerMail')} /> </p>
        <p>Login: <input type="email" name="register-login" value={this.state.registerLogin} onChange={this.handleChangeValue.bind(this, 'registerLogin')} /> </p>
        <p>Pass: <input type="password" name="register-pass" value={this.state.registerPass} onChange={this.handleChangeValue.bind(this, 'registerPass')} /> </p>
        <button onClick={this.doRegister.bind(this)}>REGISTER</button>
        <p>{this.state.registerState}</p>
      </div>
    )
  }
}

module.exports = LoginScreen
