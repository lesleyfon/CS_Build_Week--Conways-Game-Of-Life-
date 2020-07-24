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
	return (
		<main className="App">
			<section
				className="game_grid"
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${rowsCols.cols}, 20px)`,
					margin: "0 auto",
				}}
			>
				{grid.map((row, i) =>
					row.map((cel) => (
						<div
							style={{
								border: "1px solid black",
							}}
						>
							{cel}
						</div>
					))
				)}
			</section>
		</main>
	);
}

export default App;
