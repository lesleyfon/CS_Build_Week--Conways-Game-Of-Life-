import React from "react";
import Cell from "../components/Cell";

/**
 *
 * @param {*} param0
 * @returns
 */
export default function Game({ rowsCols, grid, running, updateGrid }) {
	return (
		<section
			className="game_grid"
			style={{
				gridTemplateColumns: `repeat(${rowsCols.cols}, ${(25 / rowsCols.cols) * 25 + 2}px`, // Dynamically adjust the columns width based on the number of columns on the screen
			}}
		>
			<Cell grid={grid} running={running} updateGrid={updateGrid} rowsCols={rowsCols} />
		</section>
	);
}
