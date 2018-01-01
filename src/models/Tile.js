import objectRegistry from './ObjectRegistry';
import * as Konva from 'konva';
import WorldObject from './WorldObject';

export const TILE_TYPES = Object.freeze({
  PLAIN: 1,
  WATER: 2,
  MOUNTAIN: 3,
});

export default class Tile extends WorldObject {

  static outerToInnerRadiusConstant = 0.86602540378443864676372317075294; // works for regular hexagon
  static computeInnerRadius(outerRadius) {
    return outerRadius * Tile.outerToInnerRadiusConstant;
  }

  static computeLength(outerRadius) {
    return outerRadius; // 2 * outerRadius * Tile.outerToInnerRadiusConstant;
  }

  defaultProps = {
    group: {
      x: 0,
      y: 0,
    },
    hexagon: {
      x: 0,
      y: 0,
      sides: 6,
      radius: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 2,
    },
    image: {
      x:  20,
      y: 20,
      width: 30,
      height: 30,
    }
  };

  representation = null;
  hexagon = null;
  image = null;

  type = TILE_TYPES.PLAIN;
  resources = null; // resources are object which could contain materials this tile yields, refer to manual for Tile
  // ( quick ref - materials & wealth)


  constructor(settings = {}) {
    super(settings);
    if(settings.type) {
      this.type = settings.type;
    }

    if(settings.resources) {
      this.resources = settings.resources;
    } else {
      this.generateRandomResources();
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

    if(this.type !== TILE_TYPES.WATER) {
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

  generateRandomResources() {
    const maxMaterials = 100;
    const maxWealth = 20;

    // will generate values <0, max>
    this.resources = {
      materials: Math.floor(Math.random() * (maxMaterials + 1)),
      wealth: Math.floor(Math.random() * (maxWealth + 1)),
    }
  }

  getDescription() {
    let tileTypeDesc = 'plain';
    if (this.type === TILE_TYPES.WATER) {
      tileTypeDesc = 'water';
    } else if (this.type === TILE_TYPES.MOUNTAIN) {
      tileTypeDesc = 'mountains';
    }

    return `
        <p><span>Type: </span><span>${tileTypeDesc}</span></p>
        <p><span>Resources: </span><span>${this.resources.materials} materials, ${this.resources.wealth} wealth</span></p>
        <p><span>Units: </span><span>todo</span></p>
        <p><span>Ownership: </span><span>todo</span></p>    
    `;
  }
}
