import EventEmitter from 'events';

export default class WorldObject extends EventEmitter {

  name = null; //name or id...whatever
  representation = null; // canvas representation

  // mouse event flags
  hovered = false;

  /**
   * Remove coupling to other object, remove callbacks, reset associations to this object etc
   */
  destroy() {
  }

  /**
   * All model-specific parameters should be put here. It could be resources, power, size etc...
   */
  constructor(settings = {}) {
    super();

    this.name = settings.name || 'Undefined ' + this.constructor.name;
  }


  /**
   * Method strictly for rendering
   * @param container
   */
  init(container) {}

  attachMouseEvents() {
    if (!this.representation) {
      throw new Error('Cannot bound mouns events when representation is not set');
    }
    this.representation.on('mouseover', () => {
      if(!this.hovered) {
        this.hovered = true;
        this.emit('hover', true);
      }
    });

    this.representation.on('mouseout', () => {
      this.hovered = false;
      this.emit('hover', false);
    });
  }

  /**
   *  Generate info text for info window
   * @returns {string}
   */
  getDescription() {
    return '';
  }
}
