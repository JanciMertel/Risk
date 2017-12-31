import Decorable from './Decorable';
import * as path from 'path';

/**
 * All available functions in templates are defined here
 * @type {{import: viewFunctions.import}}
 */
const viewFunctions = {
  import: function(filename) {
    return require('../views/' + filename + '.html');
  },
  children: function() {
    let out = '';
    const that = this;
    Object.keys(this.childs).forEach(function(childKey) {
      out += that.childs[childKey].render();
    });
    return out;
  },
  decorate: function(pathToClass) {
    const wantedClass = require('../views/' + pathToClass).default;
    const instance = this.decorate(wantedClass, []);
    return instance.render.call(instance);
  },
};

export default class Builder extends Decorable {

  constructor(config) {
    super(config);
    this.id = 'root' + Math.random().toString().split('.')[1];
    this.elements = {};
  }

  appendHtml(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while(div.children.length > 0) {
      if(div.children[0].tagName == 'LINK') {
        // Create an actual link element to append later
        style = document.createElement('link');
        style.href = div.children[0].href;
        // append your other things like rel, type, etc
        el.appendChild(style);
      }
      el.appendChild(div.children[0]);
    }
  }

  render() {
    const that = this;
    let html = require('../views/' + this.constructor.name.toLowerCase() + '.html');
    html = html.replace(/(^[\s]*<[a-z]*)/, function(firstElemPart) {
      return firstElemPart + ' id="' + that.id + '"';
    });
    let controlContents = html.replace(/\{@(.+)\}/g, this.viewFunction.bind(this));
    if(this.renderElement) {
      this.appendHtml(this.renderElement, controlContents);
    } else {
      return controlContents;
    }
  }

  getRootElement() {
    return document.querySelector('#' + this.id);
  }

  viewFunction() {
    if(arguments[1]) {
      let controlContents = arguments[1];
      let functionContents = controlContents.match(/([\w]*)\((.*)\)/);
      if(functionContents.length > 2) { // second is function name, third is args
        let functionParams = functionContents[2] ? JSON.parse(functionContents[2]) : null;
        let functionName = functionContents[1];
        if(typeof viewFunctions[functionName] === 'function') {
          return viewFunctions[functionName].call(this, functionParams);
        } else {
          return '{error}';
        }
      }
    }
  }

  setDomElement(element) {
    this.renderElement = document.querySelector(element);
  }
}
