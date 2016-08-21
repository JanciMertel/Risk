var React = require('react')
var ReactDOM = require('react-dom')

var Layer = require('react-konva').Layer
var Button = require('../models/button.jsx')

var connection = require('../helpers/connection.js')

var Screens = require('../enums/screens.js')
var Actions = require('../enums/actions.js')

var F = require('react-foundation')

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
    var that = this
    // parameters validation
    console.log('login')
    var loginData = {
      username: this.state.login,
      password: this.state.pass,
    }

    loginData = 'username=tester&password=123456'
    //doHttpRequest
    connection.doHttpRequest(
      'http://127.0.0.1:3000/login',
      loginData,
      function(data) {
        that.changeLoginState('login success')
        that.props.app.loginUser(data.data)
      },
      function() {
        that.changeLoginState('login error')
      })

    //this.props.app.changeScreen('lobby')
  }

  changeLoginState (newLoginState) {
    this.setState({loginState: newLoginState})
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
    return (
      <div id="login-wrapper" className="row">
        <div className="large-6">
          <h1>RISK GAME LOGIN PAGE</h1>
          <h2>please LOGIN </h2>

          <label key="loginname">
            Login:
            <input
              type="text"
              name="login"
              value={this.state.login}
              onChange={this.handleChangeValue.bind(this, 'login')}
            />
          </label>

          <label key="password">
            Pass:
            <input
              type="password"
              name="pass"
              value={this.state.pass}
              onChange={this.handleChangeValue.bind(this, 'pass')}
            />
          </label>

          <F.Button
            color={F.Colors.SUCCESS}
            onClick={this.doLogin.bind(this)}
          >
            LOGIN
          </F.Button>

          <p>{this.state.loginState}</p>


          <h2>...or REGISTER </h2>

          <label key="email">
            Email:
            <input
              type="email"
              name="register-mail"
              value={this.state.registerMail}
              onChange={this.handleChangeValue.bind(this, 'registerMail')}
            />
          </label>

          <label key="register-login">
            Login:
            <input
              type="text"
              name="register-login"
              value={this.state.registerLogin}
              onChange={this.handleChangeValue.bind(this, 'registerLogin')}
            />
          </label>

          <label key="register-pass">
            Password:
            <input
              type="password"
              name="register-pass"
              value={this.state.registerPass}
              onChange={this.handleChangeValue.bind(this, 'registerPass')}
            />
          </label>

          <F.Button color={F.Colors.ALERT} onClick={this.doRegister.bind(this)}>REGISTER</F.Button>
          <p>{this.state.registerState}</p>
        </div>
      </div>
    )
  }

}

module.exports = LoginScreen
