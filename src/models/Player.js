export default class Player {
  name = 'Anonymous';
  id = null;
  isCurrentUser = false;

  constructor(props = {}) {
    this.name = props.name;
    this.id = props.id;
    this.isCurrentUser = props.isCurrentUser;
  }
}
