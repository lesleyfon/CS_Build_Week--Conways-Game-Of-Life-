import React, { useState, useEffect } from "react";
import "./App.css";
import { getNeighborSum, runComputation, createGrid } from "./cgol_algorithm.js";

function App() {
	const [rowsCols, setRowsCols] = useState({
		rows: 10,
		cols: 10,
	});

	const [count, setCount] = useState(0);
	// To Start and Stop the game
	const [running, setRunning] = useState(false);

	const [grid, setGrid] = useState(createGrid(rowsCols.rows, rowsCols.cols));

	const runGame = () => {
		let nextGrid = runComputation(grid, rowsCols.rows, rowsCols.cols);
		setCount(count + 1);
		setGrid(nextGrid);
	};

	useEffect(() => {
		let interval = setInterval(() => {
			if (!running) {
				return;
			}
			console.table(grid);
			runGame();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [running, grid]);

	/**
	 *
	 * @param {*} grid The State of grid
	 * Updates State with random cells
	 */
	const randomCells = () => {
		setGrid(() => {
			let rows = [];
			for (let i = 0; i < rowsCols.rows; i++) {
				rows.push(Array.from(Array(rowsCols.cols), () => (Math.random() > 0.8 ? 1 : 0)));
			}
			return rows;
		});
	};

	/**
	 *
	 * @param {*} i Row Index
	 * @param {*} k Column Index
	 * This Function is used to update the a cell when a user clicks on it toggling from alive to dead
	 */
	const updateGrid = (i, k) => {
		setGrid((prevState) => {
			return prevState.map((rows, rowsIndex) =>
				rows.map((column, columnIndex) => {
					if (rowsIndex === i && columnIndex === k) {
						column = column === 0 ? 1 : 0;
					}

					return column;
				})
			);
		});
	};
	return (
		<main className="App">
			<nav>
				<ul>
					<li onClick={() => setRunning(!running)}>
						{" "}
						{running ? "Stop Game" : "Start Game"}
					</li>
					<li onClick={randomCells}> Random Cells</li>
				</ul>
			</nav>
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
							onClick={() => !running && updateGrid(i, k)}
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
