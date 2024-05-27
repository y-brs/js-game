export class Tile {
  constructor(wrapper, row, column, value, handleTileClick) {
    this.handleTileClick = handleTileClick;
    this.tileElement = document.createElement('div');
    this.tileElement.classList.add('tile');
    this.tileElement.classList.add(`tile${value}`);
    this.setPositionBy(row, column);
    wrapper.append(this.tileElement);
    this.tileElement.addEventListener('click', this.clickHandler);
  }

  setPositionBy(row, column) {
    this.row = row;
    this.column = column;
    this.tileElement.style.setProperty('--row', row);
    this.tileElement.style.setProperty('--column', column);
  }

  clickHandler = () => this.handleTileClick(this.row, this.column);

  select() {
    this.tileElement.classList.add('selected');
  }

  unSelect() {
    this.tileElement.classList.remove('selected');
  }
}
