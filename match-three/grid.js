import { Tile } from './tile.js';

export class Grid {
  tiles = [];
  selectedTile = null;

  constructor(wrapper, matrix) {
    this.wrapper = wrapper;
    this.createTiles(matrix);
  }

  createTiles(matrix) {
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[0].length; column++) {
        this.createTile(row, column, matrix[row][column]);
      }
    }
  }

  createTile(row, column, value) {
    const tile = new Tile(this.wrapper, row, column, value, this.handleTileClick);
    this.tiles.push(tile);
  }

  handleTileClick = (row, column) => {
    if (!this.selectedTile) {
      this.selectTile(row, column);
      return;
    }

    const isSelectedNeighbours = this.isSelectedNeighbours(row, column);

    if (!isSelectedNeighbours) {
      this.unSelectTile();
      this.selectTile(row, column);
      return;
    }
  };

  selectTile(row, column) {
    this.selectedTile = this.findTyleBy(row, column);
    this.selectedTile.select();
  }

  unSelectTile() {
    this.selectedTile.unSelect();
    this.selectedTile = null;
  }

  findTyleBy(row, colum) {
    return this.tiles.find((tile) => tile.row === row && tile.column === colum);
  }

  isSelectedNeighbours(row, column) {
    const isColumnNeighbours = (this.selectTile.column === column && Math.abs(this.selectTile.row - row)) === 1;
    const isRowNeighbours = this.selectTile.row === row && Math.abs(this.selectTile.column - column) === 1;
    return isColumnNeighbours || isRowNeighbours;
  }
}
