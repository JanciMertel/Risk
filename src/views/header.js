import View from './view';
import simulatorControls from '../libs/SimulatorControls';

export default class Header extends View {
  onAfterRender() {
    simulatorControls.setRoot(this.getRootElement());
    simulatorControls.createChilds();
  }
}
