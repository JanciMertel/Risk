import Builder from '../libs/Builder';
import World from '../models/World';
import htmlHelper from '../libs/helpers/HtmlHelper';
import infoWindow from '../libs/helpers/InfoWindow';

export default class Game extends Builder {
  onAfterRender() {
    super.onAfterRender.call(this);

    this.elements.canvas = this.getRootElement().querySelector('#canvas');

    htmlHelper.setRoot(document.getElementsByTagName('body')[0]);

    infoWindow.setRoot(document.getElementById('info-box'));
    infoWindow.createChilds();

    const world = new World('World', this);
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
