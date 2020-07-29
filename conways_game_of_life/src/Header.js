import React from "react";

function Header({
	setGrid,
	createGridToad,
	rowsCols,
	setGeneration,
	createGridBlinker,
	createGridGlider,
	randomCells,
	setRunning,
	setRowCol,
	createGrid,
	gridCellCount,
	setGridCellCount,
	generation,
	setSpeed,
}) {
	return (
		<nav>
			<ul>
				<li
					onClick={(e) => {
						setGrid(createGridToad(rowsCols.rows, rowsCols.cols));
						setGeneration(0);
					}}
				>
					Toad
				</li>
				<li
					onClick={(e) => {
						setGrid(createGridBlinker(rowsCols.rows, rowsCols.cols));
						setGeneration(0);
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

			<div className="grid_cells_count">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						// console.log(gridCellCount);
						if (gridCellCount <= 25) {
							setRowCol({
								rows: 25,
								cols: 25,
							});
							setGrid(createGrid(25, 25));
						} else if (gridCellCount >= 100) {
							setRowCol({
								rows: 50,
								cols: 50,
							});
							setGrid(createGrid(50, 50));
						} else {
							setRowCol({
								rows: gridCellCount,
								cols: gridCellCount,
							});
							setGrid(createGrid(gridCellCount, gridCellCount));
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
				{generation === 0 ? null : <p>Current Generation Count: {generation}</p>}

				<div id="speed">
					Speed{" "}
					<input
						type="range"
						min="1"
						max="100"
						onChange={(e) => {
							setSpeed(10 * e.target.value);
						}}
					/>
				</div>
			</div>
			<ul>
				<li onClick={() => setRunning(true)}>Play</li>

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
