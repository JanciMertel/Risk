import Builder from '../libs/Builder';
import styles from './root.scss';
/**
 * As name implies, this is the root view. It loads another views basically.
 */
export default class Root extends Builder {

  static contextIn = ['login']; // wants access to login method in Router
  static contextOut = ['login']; // allow childs to access login method from Router

  onRouteChange(route) {
    this.onRemove(true);
    const view = require('./' + route.view);
    const childRouteNode = this.decorate(view.default, []); // create view and provide context
    this.childs[childRouteNode.constructor.name] = childRouteNode;
    this.render(true);
  }
}
