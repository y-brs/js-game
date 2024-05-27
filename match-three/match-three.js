import { Game } from './game.js';
import { Grid } from './grid.js';

export class MatchThree {
  wrapper = document.querySelector('.wrapper');

  constructor(rowsCount, columnsCount, tilesCount) {
    this.game = new Game(rowsCount, columnsCount, tilesCount);
    this.grid = new Grid(this.wrapper, this.game.matrix);
  }
}
