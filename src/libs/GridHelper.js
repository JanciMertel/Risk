import Tile from '../models/Tile';

export class GridHelper {
  gridWidth = null;
  gridHeight = null;
  gridPadding = 0;
  tileOuterRadius = 0;

  setTileRadius(radius) {
    this.tileOuterRadius = radius;
  }

  setHeight(height) {
    this.gridHeight = height;
  }

  setWidth(width) {
    this.gridWidth = width;
  }

  setPadding(padding) {
    this.gridPadding = padding;
  }

  applyStageRecommendedSize(wantedWidth, wantedHeight) {
    let recommendedWidth;
    let recommendedHeight;

    const tileInnerRadius = Tile.computeInnerRadius(this.tileOuterRadius);
    const tileSideLength = Tile.computeLength(this.tileOuterRadius);
    const tileHeight = this.tileOuterRadius * 2;
    const tileWidth = tileInnerRadius * 2;
    const tileBottomHeight = (tileHeight - tileSideLength) / 2;

    wantedWidth = wantedWidth - 2 * this.gridPadding;
    wantedHeight = wantedHeight - 2 * this.gridPadding;

    const allowedCols = Math.floor(wantedWidth / tileWidth); // in even row - always more than odd row
    recommendedWidth = allowedCols * tileWidth;

    const allowedRows = Math.floor((wantedHeight - tileBottomHeight) / (tileHeight - tileBottomHeight));
    recommendedHeight = allowedRows * (tileHeight - tileBottomHeight) + tileBottomHeight;

    recommendedWidth += 2 * this.gridPadding;
    recommendedHeight += 2 * this.gridPadding;

    this.setHeight(recommendedHeight);
    this.setWidth(recommendedWidth);

    return {
      width: recommendedWidth,
      height: recommendedHeight,
    };
  }

  *getNextTilePosition() {
    let evenRow = true; // even row starts on the leftmost position (0 row, 2 row, 4 row...)
    const tileInnerRadius = Tile.computeInnerRadius(this.tileOuterRadius);
    const tileSideLength = Tile.computeLength(this.tileOuterRadius);
    const tileHeight = this.tileOuterRadius * 2;
    const tileWidth = tileInnerRadius * 2;
    const tileBottomHeight = (tileHeight - tileSideLength) / 2;

    const tilesInEvenRow = Math.floor((this.gridWidth - this.gridPadding * 2) / tileWidth);
    const tilesInOddRow = tilesInEvenRow - 1;

    let currentTileIndex = 0;
    let currentTileInRow = 1;
    let currentRow = 1;
    let last = {
      x: this.gridPadding - tileInnerRadius,
      y: this.gridPadding + this.tileOuterRadius,
    };
    while(1) {
      const next = {
        x: last.x + tileWidth,
        y: last.y,
      };
      last = next;
      yield next;

      currentTileInRow++;
      currentTileIndex++;
      if((evenRow && currentTileInRow > tilesInEvenRow) || (!evenRow && currentTileInRow > tilesInOddRow)) {
        evenRow = !evenRow;
        last.y += tileHeight;
        last.y -= tileBottomHeight;

        last.x = this.gridPadding - tileInnerRadius;
        if (!evenRow) {
          last.x += tileInnerRadius;
        }
        currentRow++;
        // end conditions - if next tile's y position would be greater than map threshold
        if (last.y > (this.gridHeight - this.gridPadding)) {
          console.log('Total tiles:' + currentTileIndex);
          return false;
        }
        currentTileInRow = 1;
      }
    }
  }
}

export default new GridHelper();
