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

			console.log(east);
			console.table(rows);
			break;
		}
		break;
	}
})();
