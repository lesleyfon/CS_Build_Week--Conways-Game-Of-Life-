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

	const [count, setCount] = useState(0);
	// To Start and Stop the game
	const [running, setRunning] = useState(false);

	const [grid, setGrid] = useState(createGrid(rowsCols.rows, rowsCols.cols)); // Creates Grid cells
	// Grid Presets State
	const [toad] = useState(createGridToad(rowsCols.rows, rowsCols.cols));
	const [blinker] = useState(createGridBlinker(rowsCols.rows, rowsCols.cols));
	const [glider] = useState(createGridGlider(rowsCols.rows, rowsCols.cols));

	// Begins the game
	const runGame = () => {
		let nextGrid = runComputation(grid, rowsCols.rows, rowsCols.cols);
		setCount(count + 1);
		setGrid(nextGrid);
	};

	// Useeffect for running the game
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
				rows.push(Array.from(Array(rowsCols.cols), () => (Math.random() > 0.8 ? 1 : 0)));
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
							setGrid(toad);
						}}
					>
						Toad
					</li>
					<li
						onClick={(e) => {
							setGrid(blinker);
						}}
					>
						Blinker
					</li>
					<li
						onClick={(e) => {
							// e.preventDefault();
							setGrid(glider);
						}}
					>
						Glider
					</li>
				</ul>

				<div className="grid_cells_count">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							console.log(gridCellCount);
							setRowCol({
								rows: gridCellCount,
								cols: gridCellCount,
							});
							console.log(typeof gridCellCount);
							setGrid(createGrid(gridCellCount, gridCellCount));
						}}
					>
						<input
							type="number"
							placeholder="Grid Cells"
							onChange={(e) => {
								setGridCellCount(Number(e.target.value));
							}}
							value={gridCellCount}
						/>
						<input type="submit" />
					</form>
					<p>{gridCellCount.count}</p>
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
				{console.log(grid)}
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
				</ul>
			</footer>
		</main>
	);
}

export default App;
