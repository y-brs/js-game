import { Game } from './game.js';

export class MatchThree {
  wrapper = document.querySelector('.wrapper');

  constructor(rowsCount, columnsCount, tilesCount) {
    this.game = new Game(rowsCount, columnsCount, tilesCount);

    console.log(this.game.matrix);
  }
}
