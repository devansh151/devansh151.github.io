const constants = {
	LEVEL: {
		GRID_ROWS: 4,
		GRID_COLS: 4
	}
}
// Board class //

class Board {
	constructor(boardHolder) {
		this.boardHolder = boardHolder;
		this.resultHolder = document.getElementById('level-result');
		this.level = 0;
		this.numberArray = [];
		this.emptyCellIndex = '0,0';
		this.movableCells = [undefined, '0,1', '1,0', undefined];
		for (let i = 1; i < constants.LEVEL.GRID_ROWS * constants.LEVEL.GRID_COLS; i++) {
			this.numberArray.push(i);
		}
		this.numberArray.sort(function () {
			return .5 - Math.random();
		});
		this.numberArray.unshift(undefined);
	}

	createCell(row, column) {
		let cell = document.createElement('section');
		cell.innerText = this.numberArray[row * constants.LEVEL.GRID_COLS + column] ? this.numberArray[row * constants.LEVEL.GRID_COLS + column] : '';
		cell.classList.add('board-cell');
		cell.id = row + ',' + column;
		return cell;
	}

	appendCell(cell) {
		this.boardHolder.appendChild(cell);
	}

	init() {
		document.addEventListener('keydown', this.markScore.bind(this));
		this.initLevel();
	}

	initLevel() {
		let level = constants.LEVEL
		this.boardHolder.style.gridTemplateRows = new Array(level.GRID_ROWS + 1).join('50px ');
		this.boardHolder.style.gridTemplateColumns = new Array(level.GRID_COLS + 1).join('50px ');
		this.generateBoard(level.GRID_ROWS, level.GRID_COLS);
	}

	markScore(e) {
		let flag = false;
		switch (e.keyCode) {
			case 37:
				// left 
				if (this.movableCells[3]) {
					let text = document.getElementById(this.movableCells[3]).innerText;
					let temp = this.movableCells[3];
					this.movableCells[3] = this.emptyCellIndex;
					this.emptyCellIndex = temp;
					this.updateEmptyCell(this.emptyCellIndex);
					this.updateCell(this.movableCells[3], text);
					flag = true;
				}
				break;
			case 38:
				// up
				if (this.movableCells[0]) {
					let text = document.getElementById(this.movableCells[0]).innerText;
					let temp = this.movableCells[0];
					this.movableCells[0] = this.emptyCellIndex;
					this.emptyCellIndex = temp;
					this.updateEmptyCell(this.emptyCellIndex);
					this.updateCell(this.movableCells[0], text);
					flag = true;
				}
				break;
			case 39:
				// right 
				if (this.movableCells[1]) {
					let text = document.getElementById(this.movableCells[1]).innerText;
					let temp = this.movableCells[1];
					this.movableCells[1] = this.emptyCellIndex;
					this.emptyCellIndex = temp;
					this.updateEmptyCell(this.emptyCellIndex);
					this.updateCell(this.movableCells[1], text);
					flag = true;
				}
				break;
			case 40:
				// down 
				if (this.movableCells[2]) {
					let text = document.getElementById(this.movableCells[2]).innerText;
					let temp = this.movableCells[2];
					this.movableCells[2] = this.emptyCellIndex;
					this.emptyCellIndex = temp;
					this.updateEmptyCell(this.emptyCellIndex);
					this.updateCell(this.movableCells[2], text);
					flag = true;
				}
				break;
			default:
				break;
		}
		if (flag)
			this.updateMovableCells();
	}

	updateMovableCells() {
		let row = parseInt(this.emptyCellIndex.split(',')[0]);
		let column = parseInt(this.emptyCellIndex.split(',')[1]);
		this.movableCells[0] = (row - 1 >= 0 ? (row - 1) + ',' + column : undefined);
		this.movableCells[2] = (row + 1 <= constants.LEVEL.GRID_ROWS - 1 ? (row + 1) + ',' + column : undefined);
		this.movableCells[3] = (column - 1 >= 0 ? row + ',' + (column - 1) : undefined);
		this.movableCells[1] = (column + 1 <= constants.LEVEL.GRID_COLS - 1 ? row + ',' + (column + 1) : undefined);
		console.log(constants.LEVEL.GRID_ROWS - 1 + ',' + constants.LEVEL.GRID_COLS - 1);
		if (this.emptyCellIndex === constants.LEVEL.GRID_ROWS - 1 + ',' + constants.LEVEL.GRID_COLS - 1)
			this.checkForGameSuccess();
	}

	updateCell(cId, text) {
		let cell = document.getElementById(cId);
		cell.innerText = text;
	}

	updateEmptyCell(cId) {
		let cell = document.getElementById(cId);
		cell.innerText = '';
	}


	generateBoard(x, y) {
		this.boardHolder.innerHTML = '';
		for (let i = 0; i < x; i++) {
			for (let j = 0; j < y; j++) {
				let cell = this.createCell(i, j);
				this.appendCell(cell);
			}
		}
	}

	getCells() {
		let childrenNodes = this.boardHolder.querySelectorAll('.board-cell');
		return Array.prototype.slice.call(childrenNodes);
	}

	checkForGameSuccess() {
		let success = true;
		for (let i = 0; i < constants.LEVEL.GRID_ROWS; i++) {
			for (let j = 0; i < constants.LEVEL.GRID_COLS; i++) {
				let el = document.getElementById(i + ',' + j);
				if (el.innerText != (i * constants.LEVEL.GRID_COLS + j) + 1)
					success = false;
			}
		}
		if (success)
			alert("you won!");
	}
}

// Init the game

const el = document.getElementById('board-holder');
const board = new Board(el);
board.init();