import React, { useRef, useEffect } from "react";

// Doind this because rendering JSX in a loop is slow especially when the grid is large
function buildGridTemplate(grid, rowsCols, updateGrid) {
	const fragment = document.createDocumentFragment();
	const NXM = grid.length;
	let row = -1,
		col = -1;
	grid.flat().forEach((cellState, idx) => {
		if (idx % NXM === 0) {
			row++;
			col = 0;
		} else {
			col++;
		}

		const div = document.createElement("div");
		// Set the div's style
		div.style.height = `${(25 / rowsCols.cols) * 25}px`;
		div.style.border = "1px solid darkgray";
		div.style.backgroundColor = cellState === 1 ? "#DFBBF2" : null;
		div.style.borderRadius = "100%";

		// Add row and col data attributes to the div to reference the cell's position in the grid
		div.setAttribute("data-row", row);
		div.setAttribute("data-col", col);

		div.addEventListener("click", (e) => {
			// Get the row and col from the div's data attributes
			const { row, col } = e.target.dataset;
			updateGrid(Number(row), Number(col));
		});

		// Append the div to the fragment
		fragment.appendChild(div);
	});

	return fragment;
}

function GridDisplay({ grid, running, updateGrid, rowsCols }) {
	const gridRef = useRef(null);
	useEffect(() => {
		const gridElement = gridRef.current;
		// Create a new grid template
		const fragmentTemplate = buildGridTemplate(grid, rowsCols, updateGrid);
		// Replace the children of the grid with the new grid
		gridElement.replaceChildren(fragmentTemplate);
	}, [grid, running, updateGrid, rowsCols]);

	return (
		<div
			ref={gridRef}
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${rowsCols.cols}, ${(25 / rowsCols.cols) * 25 + 2}px`, // Dynamically adjust the columns width based on the number of columns on the screen
			}}
		/>
	);
}

export default GridDisplay;
