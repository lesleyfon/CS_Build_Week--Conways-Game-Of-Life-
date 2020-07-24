let numRows = 5;
let numColumns = 5;
let rows = [];
let columns = [];

for (let i = 0; i < numRows; i++) {
	rows.push(Array.from(Array(numColumns), () => (Math.random() > 0.6 ? 1 : 0)));
}

let gridCopy = rows;

console.log("Original");
console.table(rows);
for (let i = 0; i < numRows; i++) {
	for (let k = 0; k < numColumns; k++) {
		let sum = getNeighborSum(rows, i, k);
		/**

             All other live cells die in the next generation. Similarly, all other dead cells stay dead.
             */
		if ((gridCopy[i][k] === 1 && sum === 2) || sum === 3) {
			//  Any live cell with two or three live neighbours survives.
			gridCopy[i][k] = 1;
		} else if (gridCopy[i][k] === 0 && sum === 3) {
			// Any dead cell with three live neighbours becomes a live cell.
			gridCopy[i][k] = 1;
		} else {
			gridCopy[i][k] = 0;
		}
	}
}

function getNeighborSum(grid, i, k) {
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
		return sum;
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
		return sum;
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
		return sum;
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
		return sum;
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
		return sum;
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
		return sum;
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
		return sum;
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
		return sum;
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
		return sum;
	}
}
