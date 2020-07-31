import React from "react";

function Cell({ grid, running, updateGrid, rowsCols }) {
	return (
		<>
			{grid.map((row, i) =>
				row.map((cel, k) => (
					<div
						key={`${i}-${k}`}
						onClick={() => !running && updateGrid(i, k)}
						style={{
							border: "1px solid darkgray",
							backgroundColor: cel === 1 ? "#DFBBF2" : null,
							borderRadius: "100%",
							height: `${(25 / rowsCols.cols) * 25}px`,
						}}
					/>
				))
			)}
		</>
	);
}

export default Cell;
