import React, { useState, useEffect, useRef } from "react";
import { createGrid } from "./../utils/cgol_algorithm";
import "./header.css";

function Header({
	// State setters
	setGrid,
	setGeneration,
	setRunning,
	setRowCol,
	setSpeed,
	// Variables - props
	isGridCompletelyDead,
	rowsCols,
	generation,
	speed,
}) {
	const [gridCellCount, setGridCellCount] = useState(""); // Handle input field
	const formRef = useRef(null);
	const submitterRef = useRef(null);
	useEffect(() => {
		const range_input = document.getElementById("range-input"),
			wrap_wrapper = range_input.parentNode;

		document.documentElement.classList.add("js");

		range_input.addEventListener(
			"input",
			(e) => {
				wrap_wrapper.style.setProperty("--val", +range_input.value);
			},
			false
		);
		return () => {
			range_input.removeEventListener("input", () => {});
		};
	});

	function updateGridDimensions(e) {
		e.preventDefault();
		setRunning(false);
		const defaultCellCount = {
			rows: gridCellCount,
			cols: gridCellCount,
		};
		if (gridCellCount <= 25) {
			defaultCellCount.rows = 25;
			defaultCellCount.cols = 25;
		} else if (gridCellCount >= 100) {
			defaultCellCount.rows = 100;
			defaultCellCount.cols = 100;
		}

		setRowCol(defaultCellCount);
		const grid = createGrid(defaultCellCount.rows, defaultCellCount.cols);
		setGrid(grid);

		setGridCellCount("");
	}

	function handleSpeedChange(e) {
		const speedInputVal = Number(e.target.value);
		setSpeed(speedInputVal);
	}
	return (
		<nav>
			<div className="grid_cells_count">
				<form onSubmit={updateGridDimensions} ref={formRef}>
					<input
						type="number"
						name="gridCellCount"
						placeholder="Grid Cells Dimension: min grid count (25 X 25)"
						onChange={(e) => setGridCellCount(Number(e.target.value))}
						value={gridCellCount}
					/>
					<input type="submit" submitterRef={submitterRef} />
				</form>
				{generation > 0 ? (
					<p className="gen-count">Current Generation Count: {generation}</p>
				) : null}
				<div className="input-range-container">
					<label>Speed:</label>
					<div
						className="wrap_wrapper"
						style={{
							"--min": 0,
							"--max": 100,
							"--val": 50,
						}}
					>
						<input
							min="1"
							max="100"
							id="range-input"
							type="range"
							onChange={handleSpeedChange}
						/>
						<output htmlFor="range-input">{speed}</output>
					</div>
				</div>
			</div>
			<ul className="game-controls">
				<li
					onClick={() => {
						// Only run if we have at least one live cell
						if (isGridCompletelyDead === false) {
							setRunning(true);
						}
					}}
				>
					Play
				</li>
				<li onClick={() => setRunning(false)}>Stop</li>
				<li
					onClick={() => {
						setGrid(createGrid(rowsCols.rows, rowsCols.cols));
						setGeneration(0);
						setRunning(false);
					}}
				>
					Clear
				</li>
			</ul>
		</nav>
	);
}

export default Header;
