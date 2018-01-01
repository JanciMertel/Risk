import Decorable from './Decorable';

export default class Router extends Decorable {

  static contextOut = ['login'];

  constructor(element) {
    super();

    this.currentKey = null;

    this.authState = null;
    this.routes = {
      '/game': {
        private: true,
        view: 'game',
      },
      login: {
        private: false,
        view: 'login',
      },
    };
  }

  /**
   * Faked for now
   * @param username
   * @param password
   */
  login(username, password) {
    this.authState = {
      username,
    };

    this.setRoute('/game');
  }

  setRoute(key) {
    if(this.currentKey === key) {
      return;
    }
    if(this.routes[key]) {
      if(this.routes[key].private && !this.authState) {
        this.setRoute('login');
      } else {
        this.currentKey = key;
        this.propagate('routeChange', this.routes[key]);
      }
    } else {
      throw new Error('Route does not exist');
    }
  }
}
