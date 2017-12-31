import Builder from '../libs/Builder';

export default class View extends Builder {

  onRemove() {
    const that = this;
    if(this.childs && this.childs.length) {
      this.childs.forEach(function(child) {
        child.onRemove();
        delete that.childs[index]; // undefined, array recreated later
      });
    }
    const rootElement = this.getRootElement();
    if(rootElement) {
      rootElement.parentNode.removeChild(rootElement);
    }
    this.childs = [];
  }

  onAfterRender() {
    this.propagate('afterRender');
  }
}
