import View from './view';

export default class Login extends View {
  static contextIn = ['login'];

  login() {
    this.context.login(this.elements.username.value, this.elements.password.value);
  }

  onAfterRender() {
    this.elements.button = this.getRootElement().querySelector('#login-form button');
    this.elements.username = this.getRootElement().querySelector('#login-form .username');
    this.elements.password = this.getRootElement().querySelector('#login-form .password');

    const that = this;
    this.elements.button.onclick = function() {
      that.login();
    };

    // dev
    this.login();
  }
}
