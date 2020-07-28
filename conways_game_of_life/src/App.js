import React, { useState, useEffect } from "react";
import "./App.css";
import {
	runComputation,
	createGrid,
	createGridToad,
	createGridBlinker,
	createGridGlider,
} from "./cgol_algorithm.js";

function App() {
	const [rowsCols, setRowCol] = useState({
		rows: 15,
		cols: 15,
	});

	const [generation, setGeneration] = useState(0);
	// To Start and Stop the game
	const [running, setRunning] = useState(false);

	const [grid, setGrid] = useState(createGrid(rowsCols.rows, rowsCols.cols)); // Creates Grid cells

	// Begins the game
	const runGame = () => {
		let nextGrid = runComputation(grid, rowsCols.rows, rowsCols.cols);
		setGeneration(generation + 1);
		setGrid(nextGrid);
	};

	// UseEffect for running the game
	useEffect(() => {
		let interval = setInterval(() => {
			if (!running) {
				return;
			}
			runGame();
		}, 100);
		return () => {
			clearInterval(interval);
		};
	}, [running, grid, rowsCols]);

	/**
	 *
	 * Creates random cells
	 */
	const randomCells = () => {
		setGrid(() => {
			let rows = [];
			for (let i = 0; i < rowsCols.rows; i++) {
				rows.push(Array.from(Array(rowsCols.cols), () => (Math.random() > 0 ? 1 : 0)));
			}
			return rows;
		});
	};
	const [gridCellCount, setGridCellCount] = useState("");

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
					<li
						onClick={(e) => {
							setGrid(createGridToad(rowsCols.rows, rowsCols.cols));
						}}
					>
						Toad
					</li>
					<li
						onClick={(e) => {
							setGrid(createGridBlinker(rowsCols.rows, rowsCols.cols));
						}}
					>
						Blinker
					</li>
					<li
						onClick={(e) => {
							setGrid(createGridGlider(rowsCols.rows, rowsCols.cols));
						}}
					>
						Glider
					</li>
				</ul>

				<div className="grid_cells_count">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (gridCellCount >= 25) {
								setRowCol({
									rows: gridCellCount,
									cols: gridCellCount,
								});
								setGrid(createGrid(gridCellCount, gridCellCount));
							} else {
								setRowCol({
									rows: 25,
									cols: 25,
								});
								setGrid(createGrid(25, 25));
							}
						}}
					>
						<input
							type="number"
							placeholder="Grid Cells: min grid count (25 X 25)"
							onChange={(e) => {
								setGridCellCount(Number(e.target.value));
							}}
							value={gridCellCount}
						/>
						<input type="submit" />
					</form>
					{generation === 0 ? null : <p>Current Generation: {generation}</p>}
				</div>
			</nav>
			<section
				className="game_grid"
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${rowsCols.cols}, 50px)`, // Work on dynamic display of grid cells
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
			<footer>
				<ul>
					<li onClick={() => setRunning(true)}>Play</li>

					<li onClick={() => setRunning(false)}>Stop</li>
					<li
						onClick={() => {
							randomCells();
							setRunning(false);
						}}
					>
						{" "}
						Random Cells
					</li>
					<li onClick={() => setGrid(createGrid(rowsCols.rows, rowsCols.cols))}>Clear</li>
				</ul>
			</footer>
		</main>
	);
}

export default App;
