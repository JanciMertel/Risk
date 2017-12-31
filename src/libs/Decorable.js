function newCall(Cls) {
  return new (Function.prototype.bind.apply(arguments[0], arguments));
}

export default class Decorable {

  static contextOut = [];
  static contextIn = [];

  constructor(config) {
    this.childs = {};
    this.parent = null;

    this.context = config ? config.context : {};
  }

  decorate(wantedClass, data) {
    const that = this;
    data.unshift(wantedClass);
    if(data.length == 1) {
      data.push({});
    }
    data[1].context = {};
    if(wantedClass.prototype instanceof Decorable) {
      wantedClass.contextIn.forEach(function(inElement) {
        if(that.constructor.contextOut.indexOf(inElement) !== -1) {
          if(typeof that[inElement] === 'function') {
            data[1].context[inElement] = that[inElement].bind(that);
          } else {
            data[1].context[inElement] = that[inElement] || that.context[inElement];
          }
        }
      });
    }
    const wantedInstance = new (Function.prototype.bind.apply(wantedClass, data));
    wantedInstance.parent = this;
    this.childs[wantedInstance.constructor.name] = wantedInstance;

    return wantedInstance;
  }

  propagate(event, data) {
    for(const i in this.childs) {
      this.childs[i].change(event, data);
    }
  }

  change(event, data) {
    const method = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
    if(typeof this[method] === 'function') {
      this[method](data);
    }
  }
}
