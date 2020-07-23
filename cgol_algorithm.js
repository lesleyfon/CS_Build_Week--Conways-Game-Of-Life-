let numRows = 10;
let numColumns = 10;
let rows = [];
let columns = [];
for (let i = 0; i < numRows; i++) {
	rows.push(Array.from(Array(numColumns), () => (Math.random() > 0.6 ? "1" : "0")));
}
