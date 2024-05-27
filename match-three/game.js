export class Game {
  constructor(rowsCount, columnsCount, elementsCount) {
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
    this.elementsCount = elementsCount;

    this.init();
  }

  init() {
    this.score = 0;
    this.matrix = new Array(this.rowsCount).fill().map(() => new Array(this.columnsCount).fill(null));

    for (let row = 0; row < this.rowsCount; row++) {
      for (let column = 0; column < this.columnsCount; column++) {
        this.matrix[row][column] = this.getRandomValue();
      }
    }
  }

  getRandomValue() {
    return Math.floor(Math.random() * this.elementsCount) + 1;
  }
}
