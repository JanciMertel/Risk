export default class Decorable {

  static contextOut = [];
  static contextIn = [];
  context = null;

  constructor(config) {
    this.childs = {};
    this.parent = null;

    this.context = config ? config.context : {};
  }

  /**
   * Enables current instance to create object and pass additional properties via context
   * This works as a primitive replacement for experimental react-like context feature.
   *
   * Note: the context feature is likely to be removed in the future (as i have seen it somewhere else..^^).
   * Ive wanted some functionality which would enable data sharing between (not only) views. But since there won't be
   * many views/components, i can just use the child-parent coupling.
   *
   * @param wantedClass
   * @param data
   * @returns {*}
   */
  decorate(wantedClass, data) {
    data.unshift(wantedClass);
    if(data.length == 1) {
      data.push({});
    }
    data[1].context = {};
    if(wantedClass.prototype instanceof Decorable) {
      wantedClass.contextIn.forEach((inElement) => {
        if(this.constructor.contextOut.indexOf(inElement) !== -1) {
          if(typeof this[inElement] === 'function') {
            data[1].context[inElement] = this[inElement].bind(this);
          } else {
            data[1].context[inElement] = this[inElement] || this.context[inElement];
          }
        }
      });
    }
    // create instance of wanted class
    const wantedInstance = new (Function.prototype.bind.apply(wantedClass, data));
    // tight coupling between parent & child
    wantedInstance.parent = this;
    this.childs[wantedInstance.constructor.name] = wantedInstance;

    return wantedInstance;
  }

  /**
   * Propagate events to all child components
   * @param event
   * @param data
   */
  propagate(event, data) {
    for(const i in this.childs) {
      this.childs[i].change(event, data);
    }
  }

  /**
   * All incoming events are checked for receiver named like 'on${eventName}'
   * @param event
   * @param data
   */
  change(event, data) {
    const method = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
    if(typeof this[method] === 'function') {
      this[method](data);
    }
  }
}
