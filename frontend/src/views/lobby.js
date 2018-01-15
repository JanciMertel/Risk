import Builder from '../libs/Builder';
import World from '../models/World';
import htmlHelper from '../libs/helpers/HtmlHelper';
import infoWindow from '../libs/helpers/InfoWindow';
import styles from './lobby.scss';
import client from '../libs/Client';

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

    this.elements.teaser = this.getRootElement().querySelector('#teaser');

    client.on('Lobby::ping', (data) => {
      console.log('ping', data);
    })
    client.emit('Lobby::findAllMatches', {}, (data) => {
      console.log('lobbies', data);
    });
    client.emit('Lobby::getPlayersInRoom', {}, (data) => {
      console.log('getPlayersInRoom', data);
    });
    client.on('Lobby::playerJoined', (data) => {
      console.log('playerJoined', data);
    })
  }

  onRemove() {
    const root = this.getRootElement();
    const buttons = root.getElementsByTagName('button');
    buttons[0].onclick = '';
    buttons[1].onclick = '';
    super.onRemove.call(this);
  }
}
