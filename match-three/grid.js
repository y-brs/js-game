import { Tile } from './tile.js';

export class Grid {
  tiles = [];
  selectedTile = null;
  isGameBlocked = false;

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
    if (this.isGameBlocked) return;

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

    const firstElementPosition = { row: this.selectedTile.row, column: this.selectedTile.column };
    const secondElementPosition = { row, column };

    const event = new CustomEvent('swap', {
      detail: {
        firstElementPosition,
        secondElementPosition,
      },
    });

    this.wrapper.dispatchEvent(event);
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
    const isColumnNeighbours = this.selectedTile.column === column && Math.abs(this.selectedTile.row - row) === 1;
    const isRowNeighbours = this.selectedTile.row === row && Math.abs(this.selectedTile.column - column) === 1;
    return isColumnNeighbours || isRowNeighbours;
  }

  async swap(firstTilePosition, secondTilePosition, swapStates) {
    this.isGameBlocked = true;

    const firstTile = this.findTyleBy(firstTilePosition.row, firstTilePosition.column);
    const secondTile = this.findTyleBy(secondTilePosition.row, secondTilePosition.column);
    this.unSelectTile();
    const firstTileAnimation = this.moveTileTo(firstTile, secondTilePosition);
    const secondTileAnimation = this.moveTileTo(secondTile, firstTilePosition);
    await Promise.all([firstTileAnimation, secondTileAnimation]);

    if (!swapStates) {
      const firstTileAnimation = this.moveTileTo(firstTile, firstTilePosition);
      const secondTileAnimation = this.moveTileTo(secondTile, secondTilePosition);
      await Promise.all([firstTileAnimation, secondTileAnimation]);
      this.isGameBlocked = false;
      return;
    }
  }

  async moveTileTo(tile, position) {
    tile.setPositionBy(position.row, position.column);
    await tile.waitForTransitionEnd();
  }
}
