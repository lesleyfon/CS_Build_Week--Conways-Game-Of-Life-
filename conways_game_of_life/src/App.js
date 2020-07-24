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

	const updateGrid = (i, k) => {
		setGrid((prevState) => {
			return prevState.map((rows, rowsIndex) =>
				rows.map((column, columnIndex) => {
					if (rowsIndex === i && columnIndex === k) {
						column = 1;
					}
					return column;
				})
			);
		});
	};
	return (
		<main className="App">
			<section
				className="game_grid"
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${rowsCols.cols}, 50px)`,
					margin: "0 auto",
				}}
			>
				{grid.map((row, i) =>
					row.map((cel, k) => (
						<div
							key={`${i}-${k}`}
							onClick={() => updateGrid(i, k)}
							style={{
								border: "1px solid black",
								backgroundColor: cel === 1 ? "#DFBBF2" : null,
								height: "50px",
							}}
						/>
					))
				)}
			</section>
		</main>
	);
}

export default App;
