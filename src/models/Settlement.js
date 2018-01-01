import objectRegistry from './ObjectRegistry';
import * as Konva from 'konva';
import WorldObject from './WorldObject';

export const SETTLEMENT_TYPES = Object.freeze({
  VILLAGE: 1,
  TOWN: 2,
  CAPITOL: 3,
});

export default class Settlement extends WorldObject {

  static outerToInnerRadiusConstant = 0.86602540378443864676372317075294; // works for regular hexagon
  static computeInnerRadius(outerRadius) {
    return outerRadius * Tile.outerToInnerRadiusConstant;
  }

  static computeLength(outerRadius) {
    return outerRadius; // 2 * outerRadius * Tile.outerToInnerRadiusConstant;
  }

  defaultProps = {};

  representation = null;

  population = 0;

  constructor(settings = {}) {
    super(settings);
    if (settings.type) {
      this.type = settings.type;
    }

    if (settings.population) {
      this.population = settings.population;
    } else {
      this.generateRandomPopulation();
    }
  }

  init(config = {}) {
    if (this.type === TILE_TYPES.WATER) {
      this.defaultProps.hexagon.fill = 'lightblue';
    } else if (this.type === TILE_TYPES.MOUNTAIN) {
      this.defaultProps.hexagon.fill = '#81512b';
    }

    this.representation = new Konva.Group(Object.assign(this.defaultProps.group, config.group));

    this.hexagon = new Konva.RegularPolygon(Object.assign(this.defaultProps.hexagon, config.hexagon));
    this.representation.add(this.hexagon);

    if (this.type !== TILE_TYPES.WATER) {
      this.attachMouseEvents();
      return new Promise((resolve, reject) => {
        const imageObj = new Image();
        imageObj.onload = () => {
          this.image = new Konva.Image(Object.assign(this.defaultProps.image, config.image, {image: imageObj}));
          this.representation.add(this.image);
          this.image.setListening(false);
          resolve();
        };
        imageObj.src = '/assets/axe.png';
      });
    }
  }

  generateRandomPopulation() {
    const maxPopulation = 1000;

    // will generate values <0, max>
    this.population = Math.floor(Math.random() * (maxPopulation + 1));
  }

  getDescription() {
    let settlementTypeDesc = 'village';
    if (this.type === SETTLEMENT_TYPES.TOWN) {
      settlementTypeDesc = 'town';
    } else if (this.type === SETTLEMENT_TYPES.CAPITOL) {
      settlementTypeDesc = 'capitol';
    }

    return `
        <p><span>Type: </span><span>${settlementTypeDesc}</span></p>
        <p><span>Population: </span><span>${this.population}</span></p>
        <p><span>Ownership: </span><span>todo</span></p>    
    `;
  }
}
