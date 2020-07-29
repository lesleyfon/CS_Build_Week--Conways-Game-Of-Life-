import React, { useState, useEffect } from "react";
import "./App.css";
import {
	runComputation,
	createGrid,
	createGridToad,
	createGridBlinker,
	createGridGlider,
	createGridPulsar,
} from "./cgol_algorithm.js";

// Components
import Header from "./Header";
import Cell from "./Cell";

function App() {
	const [rowsCols, setRowCol] = useState({
		rows: 25,
		cols: 25,
	});

	// State used for updating the speed
	const [speed, setSpeed] = useState(10);

	// State to Keep count of the Generation
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
		}, speed);
		return () => {
			clearInterval(interval);
		};
	}, [running, grid, rowsCols, speed]);

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
						console.log("Pulsar", i, k);
						column = column === 0 ? 1 : 0;
					}

					return column;
				})
			);
		});
	};
	return (
		<main className="App">
			<Header
				setGrid={setGrid}
				createGridToad={createGridToad}
				rowsCols={rowsCols}
				setGeneration={setGeneration}
				createGridBlinker={createGridBlinker}
				createGridGlider={createGridGlider}
				randomCells={randomCells}
				setRunning={setRunning}
				setRowCol={setRowCol}
				createGrid={createGrid}
				gridCellCount={gridCellCount}
				setGridCellCount={setGridCellCount}
				generation={generation}
				setSpeed={setSpeed}
				createGridPulsar={createGridPulsar}
			/>
			<section
				className="game_grid"
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${rowsCols.cols}, ${
						(25 / rowsCols.cols) * 25 + 2
					}px`, // Dynamically ajust the columns width based on the number of columns on the screen
					margin: "0 auto",
					maxWidth: "1250px",
				}}
			>
				<Cell grid={grid} running={running} updateGrid={updateGrid} rowsCols={rowsCols} />
			</section>
		</main>
	);
}

export default App;
