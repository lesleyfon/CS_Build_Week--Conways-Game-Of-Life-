let numRows = 10;
let numColumns = 10;
let rows = [];
let columns = [];

for (let i = 0; i < numRows; i++) {
	rows.push(Array.from(Array(numColumns), () => (Math.random() > 0.6 ? "1" : "0")));
}

(function () {
	for (let i = 0; i < numRows; i++) {
		for (let k = 0; k < numColumns; k++) {
			// ternary = true ? true : false
			let north = rows[i - 1] ? rows[i - 1][k] : rows[numRows - 1][k]; // If the top element is undefine we want to get the bottom element
			let south = rows[i + 1] ? rows[i + 1][k] : rows[0][k]; // Bottom Element
			let west = rows[i][k - 1] ? rows[i][k - 1] : rows[i][9]; // If the left element is undefine get the right most element
			let east = rows[i][k + 1] ? rows[i][k + 1] : rows[i][0];

			let northWest;
			if (rows[i - 1] === undefined && k === 0) {
				// If we are at first element of the top row the the last element of the bottom row
				northWest = rows[numRows - 1][9];
			} else if (rows[i - 1] === undefined && k > 0) {
				// IF we are at the top row and the second column, get the element to the left of the bottom column
				northWest = rows[numRows - 1][k - 1];
			} else {
				// Else get the element of the bottom
				northWest = rows[i - 1][k - 1];
			}
			console.log("hello", i, k);
			console.log(northWest);
			console.table(rows);
			if (k === 9) {
				break;
			}
		}
		break;
	}
})();
