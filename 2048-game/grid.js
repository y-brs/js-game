import { Cell } from './cell.js';

const GRID_SIZE = 4;
const CELL_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
  constructor(gridElement) {
    this.cells = [];

    for (let i = 0; i < CELL_COUNT; i++) {
      this.cells.push(new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE)));
    }
  }
}
