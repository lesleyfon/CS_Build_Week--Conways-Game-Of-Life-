import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

// Components
import Header from "./Header";
import Cell from "./Cell";
import About from "./About";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { createGrid, runComputation } from "./cgol_algorithm";

function App() {
	const [rowsCols, setRowCol] = useState({
		rows: 25,
		cols: 25,
	});

	// State used for updating the speed
	const [speed, setSpeed] = useState(50);

	// State to Keep count of the Generation
	const [generation, setGeneration] = useState(0);

	// To Start and Stop the game
	const [running, setRunning] = useState(false);

	const [grid, setGrid] = useState(createGrid(rowsCols.rows, rowsCols.cols)); // Creates Grid cells

	const [gridCellCount, setGridCellCount] = useState(""); // Handle input field

	const [openModal, setOpenModal] = useState(false);
	// Begins the game
	const runGame = () => {
		let nextGrid = runComputation(grid, rowsCols.rows, rowsCols.cols);
		setGeneration(generation + 1);
		setGrid(nextGrid);
	};

	// UseEffect for running the game
	useEffect(() => {
		const inverse = 100 / speed;
		let interval = setInterval(() => {
			if (!running) {
				return;
			}
			runGame();
		}, inverse * 100);
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
				rows.push(Array.from(Array(rowsCols.cols), () => (Math.random() > 0.9 ? 1 : 0)));
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

	const handleClose = () => setOpenModal(false);
	const isGridCompletelyDead = useMemo(() => {
		return grid.every((row) => row.every((c) => c === 0));
	}, [grid]);

	return (
		<main className="App">
			<div className="modal">
				<button
					onClick={(e) => {
						setOpenModal(true);
					}}
				>
					About
				</button>
				<Modal
					open={openModal}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<About />
				</Modal>
			</div>
			<Header
				speed={speed}
				isGridCompletelyDead={isGridCompletelyDead}
				setGrid={setGrid}
				rowsCols={rowsCols}
				setGeneration={setGeneration}
				randomCells={randomCells}
				setRunning={setRunning}
				setRowCol={setRowCol}
				gridCellCount={gridCellCount}
				setGridCellCount={setGridCellCount}
				generation={generation}
				setSpeed={setSpeed}
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
