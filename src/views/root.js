import View from './view';

export default class Root extends View {

  static contextIn = ['login'];
  static contextOut = ['login'];

  onRouteChange(route) {
    this.onRemove();
    const view = require('./' + route.view);
    const childRouteNode = this.decorate(view.default, []);
    this.childs[childRouteNode.constructor.name] = childRouteNode;
    this.render();
    this.onAfterRender();
  }
}
