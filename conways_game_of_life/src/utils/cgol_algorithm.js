/**
 *
 * @param {*} numRow Represents the Number of rows to be created
 * @param {*} numCols Represents the number of columns to be created
 * @returns a 3D array
 */
export function createGrid(numRow, numCols) {
	let grid = Array.from(Array(numRow), () => new Array(numCols).fill(0));
	return grid;
}

function setCellToAlive(list, grid) {
	list.map(([r, c]) => {
		grid[r][c] = 1;
	});
}
export function createGridToad(row, col) {
	const grid = createGrid(row, col);
	const points = [
		[3, 3],
		[3, 4],
		[3, 5],
		[4, 4],
		[4, 3],
		[4, 2],
	];
	setCellToAlive(points, grid);
	return grid;
}

export function createGridBlinker(row, col) {
	const grid = createGrid(row, col);
	const points = [
		[3, 3],
		[3, 4],
		[3, 5],
	];
	setCellToAlive(points, grid);
	return grid;
}

export function createGridGlider(row, col) {
	const grid = createGrid(row, col);
	const points = [
		[4, 3],
		[5, 4],
		[5, 5],
		[4, 5],
		[3, 5],
	];

	setCellToAlive(points, grid);

	return grid;
}
export function createGridPulsar(row, col) {
	const grid = createGrid(row, col);
	const points = [
		[9, 12],
		[10, 12],
		[10, 12],
		[11, 12],
		[11, 12],
		[12, 12],
		[12, 12],
		[13, 12],
		[13, 12],
		[14, 12],
		[14, 12],
		[10, 11],
		[10, 11],
		[10, 13],
		[10, 13],
	];

	setCellToAlive(points, grid);
	return grid;
}
export function createGridLWSS(row, col) {
	const grid = createGrid(row, col);
	const points = [
		[9, 9],
		[9, 9],
		[11, 9],
		[11, 9],
		[12, 10],
		[12, 10],
		[12, 12],
		[12, 12],
		[12, 11],
		[12, 11],
		[12, 13],
		[12, 13],
		[11, 13],
		[11, 13],
		[10, 13],
		[10, 13],
		[9, 12],
		[9, 12],
	];
	setCellToAlive(points, grid);
	return grid;
}
export function createGridHWSS(row, col) {
	//(LWSS)
	const grid = createGrid(row, col);
	const points = [
		[8, 11],
		[8, 12],
		[9, 9],
		[11, 9],
		[12, 10],
		[12, 11],
		[12, 12],
		[12, 13],
		[12, 14],
		[12, 15],
		[11, 15],
		[10, 15],
		[9, 14],
	];
	setCellToAlive(points, grid);
	return grid;
}
export function createGridPenta_decathlon(row, col) {
	//(LWSS)
	const grid = createGrid(row, col);
	const points = [
		[8, 10],
		[8, 11],
		[8, 12],
		[9, 12],
		[10, 12],
		[11, 12],
		[12, 12],
		[13, 12],
		[14, 12],
		[15, 12],
		[15, 11],
		[15, 10],
		[14, 10],
		[13, 10],
		[12, 10],
		[11, 10],
		[10, 10],
		[9, 10],
		[13, 11],
		[12, 11],
		[11, 11],
		[10, 11],
	];
	setCellToAlive(points, grid);

	return grid;
}

/**
 *
 * @param {*} grid current grid
 * @param {*} row the total number or rows for a grid
 * @param {*} col total number of columns for a grid
 * @returns returns the next generation of the grid
 */
export function runComputation(grid, row, col) {
	let gridCopy = createGrid(row, col);

	for (let i = 0; i < row; i++) {
		for (let k = 0; k < col; k++) {
			let sum = getNeighborSum(grid, i, k, row, col);
			/**
		 
		 All other live cells die in the next generation. Similarly, all other dead cells stay dead.
		 */
			if (grid[i][k] === 0 && sum === 3) {
				// Any dead cell with three live neighbours becomes a live cell.
				gridCopy[i][k] = 1;
			} else if (grid[i][k] === 1 && (sum === 2 || sum === 3)) {
				//  Any live cell with two or three live neighbours survives.
				gridCopy[i][k] = 1;
			} else {
				gridCopy[i][k] = 0;
			}
		}
	}

	grid = gridCopy;

	return grid;
}

export function getNeighborSum(grid, i, k, numRows, numColumns) {
	let sum = 0;
	if (i === 0 && k === 0) {
		/**
		 *  The Cell in the First row. i.e the cell in the top left corner.
		 */

		sum += grid[numRows - 1][k]; // N
		sum += grid[numRows - 1][k + 1]; //NE
		sum += grid[i][k + 1]; // E
		sum += grid[i + 1][k + i]; // SE
		sum += grid[i + 1][k]; // S
		sum += grid[i + 1][numColumns - 1]; // SW
		sum += grid[i][numColumns - 1]; //W
		sum += grid[numRows - 1][numColumns - 1]; // NW
	} else if (i === 0 && k === numColumns - 1) {
		/**
		 * The last cell in the first row. i.e The Cell in the top right hand conner
		 */
		sum += grid[numRows - 1][k]; // N
		sum += grid[numRows - 1][0]; // NE
		sum += grid[i][0]; // E
		sum += grid[i + 1][0]; // SE
		sum += grid[i + 1][k]; // S
		sum += grid[i + 1][k - 1]; // SW
		sum += grid[i][k - 1]; // W
		sum += grid[numRows - 1][k - 1]; // NW
	} else if (i === numRows - 1 && k === 0) {
		/**
		 * The last cell in th last row. i.e the bottom left hand cell
		 */
		sum += grid[i - 1][k]; // N
		sum += grid[i - 1][k + 1]; // NE
		sum += grid[i][k + 1]; // E
		sum += grid[0][k + 1]; // SE
		sum += grid[0][0]; // S
		sum += grid[0][numColumns - 1]; // SW
		sum += grid[i][numColumns - 1]; // W
		sum += grid[i - 1][numColumns - 1]; // NW
	} else if (i === numRows - 1 && k === numColumns - 1) {
		/**
		 * The last cell in the last row. i.e The cell in the bottom right hand conner
		 */

		sum += grid[i - 1][k]; // N
		sum += grid[i - 1][0]; // NE
		sum += grid[i][0]; // E
		sum += grid[0][0]; // SE
		sum += grid[0][k]; // S
		sum += grid[0][k - 1]; // SW
		sum += grid[i][k - 1]; // W
		sum += grid[i - 1][k - 1]; // NW
	} else if (i === 0 && (k > 0 || k < numColumns - 2)) {
		/**
		 * Everything in the top row excluding the first cell and the last cell
		 */
		sum += grid[numRows - 1][k]; // N
		sum += grid[numRows - 1][k + 1]; // NE
		sum += grid[i][k + 1]; // E
		sum += grid[i + 1][k + 1]; // SE
		sum += grid[i + 1][k]; // S
		sum += grid[i + 1][k - 1]; // SW
		sum += grid[i][k - 1]; // W
		sum += grid[numRows - 1][k - 1]; // NW
	} else if (i === numRows - 1 && (k > 0 || k < numColumns - 2)) {
		/**
		 * Everything cell in the bottom row excluding the first and the last cell
		 */
		sum += grid[i - 1][k]; // N
		sum += grid[i - 1][k + 1]; // NE
		sum += grid[i][k + 1]; // E
		sum += grid[0][k + 1]; // SE
		sum += grid[0][k]; // S
		sum += grid[0][k - 1]; // SW
		sum += grid[i][k - 1]; // W
		sum += grid[i - 1][k - 1]; // NW
	} else if (k === 0 && (i > 0 || i < numRows - 1)) {
		/**
		 * The First Cells Between  the second row and the second to the last row
		 */
		sum += grid[i - 1][k]; // N
		sum += grid[i - 1][k + 1]; // NE // and This
		sum += grid[i][k + 1]; // E
		sum += grid[i + 1][k + 1]; // SE // Look at this
		sum += grid[i + 1][k]; // S
		sum += grid[i + 1][numColumns - 1]; // SW
		sum += grid[i][numColumns - 1]; // W
		sum += grid[i - 1][numColumns - 1]; // NW
	} else if (k === numColumns - 1 && (i > 0 || i < numRows - 1)) {
		/**
		 *  The Cells between the 2 row and the 2 to the last rows
		 */
		sum += grid[i - 1][k]; // N
		sum += grid[i - 1][0]; // NE
		sum += grid[i][0]; // E
		sum += grid[i + 1][0]; // SE
		sum += grid[i + 1][k]; // S
		sum += grid[i + 1][k - 1]; // SW
		sum += grid[i][k - 1]; // W
		sum += grid[i - 1][k - 1]; // NW
	} else {
		/**
		 * Every Cell that has Other Cells surround it
		 */
		sum += grid[i - 1][k]; // N
		sum += grid[i - 1][k + 1]; // NE
		sum += grid[i][k + 1]; // E
		sum += grid[i + 1][k + 1]; // SE
		sum += grid[i + 1][k]; // S
		sum += grid[i + 1][k - 1]; // SW
		sum += grid[i][k - 1]; // W
		sum += grid[i - 1][k - 1]; // NW
	}

	return sum;
}
