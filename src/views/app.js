import View from './view';
import World from '../models/World';
import htmlHelper from '../libs/HtmlHelper';
import infoWindow from '../libs/InfoWindow';

export default class App extends View {
  onAfterRender() {
    super.onAfterRender.call(this);

    this.elements.canvas = this.getRootElement().querySelector('#canvas');

    htmlHelper.setRoot(document.getElementsByTagName('body')[0]);

    infoWindow.setRoot(document.getElementById('info-box'));
    infoWindow.createChilds();

    const config = require('./config.js').default;

    const world = new World('World', this, config);
    world.init(this.elements.canvas);

    world.on('info-box', (obj) => {
      if(obj) {
        infoWindow.setData(obj.name, obj.getDescription());
      } else {
        infoWindow.clear();
      }
    });
  }
}
