export class HtmlHelper {
  elements = {};
  root = null;

  setRoot(newRoot) {
    this.root = newRoot;
  }

  addElement(element, name, append = false) {
    if(!name) {
      throw new Error('Name must be provided');
    }
    if(append) {
      this.root.appendChild(element);
    }
    this.elements[name] = element;
  }

  getElement(name) {
    return this.elements[name];
  }

  htmlToElements(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
  }
}

export default new HtmlHelper();
