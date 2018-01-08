import Builder from '../libs/Builder';
import simulatorControls from '../libs/helpers/SimulatorControls';

export default class Header extends Builder {
  onAfterRender() {
    simulatorControls.setRoot(this.getRootElement());
    simulatorControls.createChilds();
  }
}
