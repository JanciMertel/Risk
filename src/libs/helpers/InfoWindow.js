import { HtmlHelper } from './HtmlHelper';

class InfoWindow extends HtmlHelper {
  createChilds() {
    this.addElement(document.createElement('H4'), 'name', true);
    this.addElement(document.createElement('p'), 'description', true);
  }

  setData(header, description) {
    this.elements.name.innerHTML = header;
    this.elements.description.innerHTML = description;
  }

  clear() {
    this.elements.name.innerHTML = '';
    this.elements.description.innerHTML = '';
  }
}

export default new InfoWindow();
