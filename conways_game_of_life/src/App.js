import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

// Components
import Header from "./components/Header";
import About from "./components/About";

import { createGrid, runComputation } from "./utils/cgol_algorithm";
import Aside from "./components/Aside";
import Layout from "./layout";

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

	const [openModal, setOpenModal] = useState(false);

	// UseEffect for running the game
	useEffect(() => {
		// Begins the game
		const runGame = () => {
			let nextGrid = runComputation(grid, rowsCols.rows, rowsCols.cols);
			setGeneration(generation + 1);
			setGrid(nextGrid);
		};

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
				<button onClick={(e) => setOpenModal(true)} className="about">
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
			<section className="main-section">
				<Aside {...{ setGrid, setGeneration, setRunning, rowsCols, randomCells }} />

				<section>
					<Header
						speed={speed}
						isGridCompletelyDead={isGridCompletelyDead}
						setGrid={setGrid}
						rowsCols={rowsCols}
						setGeneration={setGeneration}
						randomCells={randomCells}
						setRunning={setRunning}
						setRowCol={setRowCol}
						generation={generation}
						setSpeed={setSpeed}
					/>
					{/* https://github.com/remix-run/react-router/blob/v5.2.0/packages/react-router/docs/api/Route.md */}
					<Layout {...{ rowsCols, grid, running, updateGrid }} />
				</section>
			</section>
		</main>
	);
}

export default App;
