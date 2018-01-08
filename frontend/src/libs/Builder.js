import Decorable from './Decorable';

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
  repeat: function(whichVariableName, whichElementName, htmlContent) {
    let out = '';
    for (const element of  this[whichVariableName]) {
      out += htmlContent.replace(/\{@(((?!\{@).)*)\}/g, (var1, controlContents) => {
        return this.viewFunction(controlContents, [ whichElementName, element]);
      });
    }
    return out;
  },
  replace: function(variablePlaceholder, variableName, variableReplacement, content) {
    if (!content) {
      content = variablePlaceholder;
    }
    let helper = {};
    if(variableReplacement && variableName) {
      eval('helper.' + variableName + '=' + JSON.stringify(variableReplacement));
    } else {
      helper = this;
    }
    return content.replace(new RegExp('(' + variablePlaceholder + '[\.a-zA-Z0-9]*)', 'g' ), (search, value) => {
      try {
        const test = eval('helper.' + value)
        return test;
      } catch(e) {
        return 'undefined';
      }
    });
  }
};

export default class Builder extends Decorable {

  constructor(config) {
    super(config);
    this.id = 'root' + Math.random().toString().split('.')[1];
    this.elements = {};
  }

  appendHtml(el, str) {
    const div = document.createElement('div');
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
    if(this.getRootElement()) {
      this.onRemove();
    }
    let html = require('../views/' + this.constructor.name.toLowerCase() + '.html');
    html = html.replace(/(^[\s]*<[a-z]*)/, (firstElemPart) => firstElemPart + ' id="' + this.id + '"');
    let controlContents = html.replace(/\{@(.+)\}/g, (arg1, controlContents) => {
      return this.viewFunction(controlContents);
    });
    if(this.renderElement) {
      this.appendHtml(this.renderElement, controlContents);
      this.onAfterRender();
    } else {
      return controlContents;
    }
  }

  getRootElement() {
    return document.querySelector('#' + this.id);
  }

  viewFunction(controlContents, additionalParameters) {
    if(controlContents) {
      let functionContents = controlContents.match(/([\w]*)\((.*)\)/);
      if(functionContents.length > 2) { // second is function name, third is args
        let functionParams = functionContents[2] ? JSON.parse( '[' + functionContents[2] + ']') : null;

        if (additionalParameters) {
          functionParams = functionParams.concat(additionalParameters);
        }

        let functionName = functionContents[1];
        if(typeof viewFunctions[functionName] === 'function') {
          return viewFunctions[functionName].apply(this, functionParams);
        } else {
          return '{error}';
        }
      }
    }
  }

  setDomElement(element) {
    this.renderElement = document.querySelector(element);
  }

  onRemove(completely = false) {
    const rootElement = this.getRootElement();
    if (rootElement) {
      if (this.childs && this.childs.length) {
        this.childs.forEach((child) => {
          if (child.getRootElement()) {
            child.onRemove(completely);
          }
          delete this.childs[index]; // undefined, array recreated later
        });
      }
      rootElement.parentNode.removeChild(rootElement);
      if (completely) {
        this.childs = [];
      }
    }
  }

  onAfterRender() {
    this.propagate('afterRender');
  }
}
