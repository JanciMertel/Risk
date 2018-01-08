import Builder from '../libs/Builder';
import World from '../models/World';
import htmlHelper from '../libs/helpers/HtmlHelper';
import infoWindow from '../libs/helpers/InfoWindow';

export default class Lobby extends Builder {
  rooms = [{name: 'prva'}, {name: 'druha'}];

  onAfterRender() {
    super.onAfterRender.call(this);

    const root = this.getRootElement();
    const buttons = root.getElementsByTagName('button');
    buttons[0].onclick = () => {
      this.rooms[0].name = Math.random();
      this.parent.render();
    };
    buttons[1].onclick = () => {
      this.rooms[1].name = Math.random();
      this.parent.render();
    };

    window.test =this;
  }

  onRemove() {
    const root = this.getRootElement();
    const buttons = root.getElementsByTagName('button');
    buttons[0].onclick = '';
    buttons[1].onclick = '';
    super.onRemove.call(this);
  }
}
