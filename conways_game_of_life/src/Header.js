import React, { useEffect } from "react";
import {
	createGrid,
	createGridToad,
	createGridBlinker,
	createGridGlider,
	createGridPulsar,
	createGridLWSS,
	createGridHWSS,
	createGridPenta_decathlon,
} from "./cgol_algorithm.js";
import "./header.css";

function Header({
	// State setters
	setGrid,
	setGeneration,
	setRunning,
	setRowCol,
	setGridCellCount,
	setSpeed,
	// Variables - props
	isGridCompletelyDead,
	rowsCols,
	randomCells,
	gridCellCount,
	generation,
	speed,
}) {
	function updateGridDimensions(e) {
		e.preventDefault();
		const defaultCellCount = {
			rows: gridCellCount,
			cols: gridCellCount,
		};

		if (gridCellCount <= 25) {
			defaultCellCount.rows = 25;
			defaultCellCount.cols = 25;
		} else if (gridCellCount >= 100) {
			defaultCellCount.rows = 50;
			defaultCellCount.cols = 50;
		}

		setRowCol(defaultCellCount);
		setGrid(createGrid(defaultCellCount.rows, defaultCellCount.cols));

		setGridCellCount("");
	}
	const data = [
		{ name: "Random Cells", createPattern: randomCells },
		{ name: "Toad", createPattern: createGridToad },
		{ name: "Blinker", createPattern: createGridBlinker },
		{ name: "Pulsar", createPattern: createGridPulsar },
		{ name: "Glider", createPattern: createGridGlider },
		{ name: "LWSS", createPattern: createGridLWSS },
		{
			name: "HWSS",
			createPattern: createGridHWSS,
		},
		{
			name: "Penta decathlon",
			createPattern: createGridPenta_decathlon,
		},
	];

	function handleSpeedChange(e) {
		console.log(e.target.value);
		const speedInputVal = Number(e.target.value);
		setSpeed(speedInputVal);
	}
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
	return (
		<nav>
			<div>
				<ul>
					{data.map(({ name, createPattern }) => (
						<li
							key={name}
							onClick={() => {
								const gridGrn = createPattern(rowsCols.rows, rowsCols.cols);
								if (gridGrn?.length) {
									setGrid(gridGrn);
								}
								setGeneration(0);
								setRunning(false);
							}}
						>
							{name}
						</li>
					))}
				</ul>
			</div>
			<div className="grid_cells_count">
				<form onSubmit={updateGridDimensions}>
					<input
						type="number"
						placeholder="Grid Cells Dimension: min grid count (25 X 25)"
						onChange={(e) => setGridCellCount(Number(e.target.value))}
						value={gridCellCount}
					/>
					<input type="submit" />
				</form>
				{generation > 0 ? <p>Current Generation Count: {generation}</p> : null}
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
						<output for="r">{speed}</output>
					</div>
				</div>
			</div>
			<ul>
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
