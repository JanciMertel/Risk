import { HtmlHelper } from './HtmlHelper';
import ticker from './FakeTicker';

class SimulatorControls extends HtmlHelper {
  createChilds() {
    const template = this.htmlToElements(
      '    <div class="play-fast">\n' +
      '        <span class="triangle"></span>\n' +
      '        <span class="triangle"></span>\n' +
      '        <span class="triangle"></span>\n' +
      '    </div>\n' +
      '    <div class="play-normal">\n' +
      '        <span class="triangle"></span>\n' +
      '    </div>\n' +
      '    <div class="play-pause">\n' +
      '        <span class="vertical-line"></span>\n' +
      '        <span class="vertical-line"></span>\n' +
      '    </div>\n' +
      '    <span class="time"></span>'
    );

    this.root.append(template);
    this.addElement(this.root.querySelector('.play-pause'), 'pause');
    this.addElement(this.root.querySelector('.play-normal'), 'play-normal');
    this.addElement(this.root.querySelector('.play-fast'), 'play-fast');

    this.getElement('pause').onclick = this.pause.bind(this);
    this.getElement('play-normal').onclick = this.play.bind(this, 1);
    this.getElement('play-fast').onclick = this.play.bind(this, 3);
  }

  pause() {
    ticker.stop();
  }

  play(modifier) {
    ticker.tickTimeoutMultiplier = modifier;
    ticker.reset();
  }
}

export default new SimulatorControls();
