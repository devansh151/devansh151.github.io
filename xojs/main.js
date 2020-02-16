const constants = {
	LEVEL: {
		GRID_ROWS: 3,
		GRID_COLS: 3
	}
}
// Board class //

class Board {
	constructor(boardHolder) {
		this.boardHolder = boardHolder;
		this.resultHolder = document.getElementById('level-result');
		this.level = 0;
		this.currentPlayer = 'X';
	}

	createCell(row, column) {
		let cell = document.createElement('section');
		cell.classList.add('board-cell');
		cell.id = row + ',' + column;
		cell.addEventListener('click', this.markScore.bind(this, row + ',' + column));
		return cell;
	}

	appendCell(cell) {
		this.boardHolder.appendChild(cell);
	}

	init() {
		this.initLevel();
	}

	initLevel() {
		let level = constants.LEVEL
		this.boardHolder.style.gridTemplateRows = new Array(level.GRID_ROWS + 1).join('50px ');
		this.boardHolder.style.gridTemplateColumns = new Array(level.GRID_COLS + 1).join('50px ');
		this.generateBoard(level.GRID_ROWS, level.GRID_COLS);
	}

	markScore(id) {
		let cell = document.getElementById(id);
		if (cell.innerText == '') {
			cell.innerText = this.currentPlayer;
			this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
			this.checkForGameSuccess();
		}
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