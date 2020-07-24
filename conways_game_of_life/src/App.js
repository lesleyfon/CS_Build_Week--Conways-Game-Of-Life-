import React, { useState } from "react";
import "./App.css";

function App() {
	const [rowsCols, setRowsCols] = useState({
		rows: 10,
		cols: 10,
	});

	const [grid, setGrid] = useState(() => {
		let rows = [];
		for (let i = 0; i < rowsCols.rows; i++) {
			rows.push(Array.from(Array(rowsCols.cols), () => (Math.random() > 0.6 ? 1 : 0)));
		}
		return rows;
	});

	console.log(grid);
	return <div className="App">Hello</div>;
}

export default App;
