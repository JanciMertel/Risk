import objectRegistry from './ObjectRegistry';
import simulator from '../libs/FakeTicker';
import * as Konva from 'konva';
import Tile, { TILE_TYPES } from './Tile';
import gridHelper from '../libs/GridHelper';
import WorldObject from './WorldObject';

export default class World extends WorldObject {

  stage = null;
  tileLayer = null;
  afterCreatePromises = []; // store promises for additional render after create

  destroy() {
    objectRegistry.reset();
  }

  init(container) {
    this.destroy();
    if (this.stage) {
      this.stage.destroy();
    }

    gridHelper.setPadding(30);
    gridHelper.setTileRadius(50); 

    const { width, height } = gridHelper.applyStageRecommendedSize(2000, 1000);

    this.stage = new Konva.Stage({
      container,
      width,
      height,
      draggable: true,
      dragBoundFunc: (pos) => {
        return pos;
        console.log(pos.x, pos.y);
        let x = pos.x;
        let y = pos.y;
        if (x > 0) {
          x = 0;
        }
        if (x < -width) {
          x = -width;
        }
        if (y > 0) {
          y = 0;
        }
        if (y < -height) {
          y = -height;
        }
        return {
          x,
          y,
        };
      }
    });

    objectRegistry.setRoot(this);

    this.addStageBorder();

    this.buildWorld();

    simulator.start();

    this.enableZooming();

  }

  /**
   * Optional - call to this method would render rectangle around whole stage
   */
  addStageBorder() {
    this.stageBorderLayer = new Konva.FastLayer();

    const stageStroke = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.stage.width(),
      height: this.stage.height(),
      fill: 'lightblue',
      stroke: 'black',
      strokeWidth: 1
    });

    this.stageBorderLayer.add(stageStroke);

    // add the layer to the stage
    this.stage.add(this.stageBorderLayer);
  }

  /**
   * Enables zooming via mouse scroll
   */
  enableZooming() {
    const scaleBy = 0.8;
    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      const oldScale = this.stage.scaleX();

      const mousePointTo = {
        x: this.stage.getPointerPosition().x / oldScale - this.stage.x() / oldScale,
        y: this.stage.getPointerPosition().y / oldScale - this.stage.y() / oldScale,
      };

      const newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      this.stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x: -(mousePointTo.x - this.stage.getPointerPosition().x / newScale) * newScale,
        y: -(mousePointTo.y - this.stage.getPointerPosition().y / newScale) * newScale
      };
      this.stage.position(newPos);
      this.stage.batchDraw();
    });
  }

  /**
   * Would build tiles, prepare world resources etc, game should be ready after this
   */
  buildWorld() {
    this.tileLayer = new Konva.Layer();

    const tilePositionIterator = gridHelper.getNextTilePosition();
    let currentPosition = null;
    let tileId = 0;
    while(currentPosition = tilePositionIterator.next().value) {
      tileId++;
      const typeRand = Math.random();
      let type = TILE_TYPES.PLAIN;
      if (typeRand >= 0.5 && typeRand < 0.75) {
        type = TILE_TYPES.MOUNTAIN;
      } else if(typeRand >= 0.75) {
        type = TILE_TYPES.WATER;
      }

      const tile = new Tile({
        type: type,
        name: 'Tile #' + tileId,
      });
      const possiblePromise = tile.init({
        group: {
          x: currentPosition.x,
          y: currentPosition.y,
        },
        hexagon: {
          radius: gridHelper.tileOuterRadius,
        },
        image: {
          x: -15,
          y: -15,
          width: 30,
          height: 30,
        }
      });
      objectRegistry.add(tile, this);
      this.tileLayer.add(tile.representation);

      if(possiblePromise && possiblePromise.constructor.name === 'Promise') {
        this.afterCreatePromises.push(possiblePromise);
      }

      tile.on('hover', (over) => {
        if(over) {
          this.emit('info-box', tile)
        } else {
          this.emit('info-box', null);
        }
      });
    }

    // after all tiles are prepared, wait for the 'images' to load and the redraw again
    Promise.all(this.afterCreatePromises).then(() => this.stage.draw());

    this.stage.add(this.tileLayer);
  }
}
