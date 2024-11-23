import React, { useEffect, useRef, useMemo, useCallback } from "react";

/**
 *
 * @param {{
 * grid: number[][],
 * rows: number,
 * cols: number,
 * context: CanvasRenderingContext2D,
 * cellSize: number,
 * CANVAS_DIMENSIONS: {height: number, width: number}
 * }} param0
 */
function drawGrid({ grid, rows, cols, context, cellSize, CANVAS_DIMENSIONS }) {
	context.clearRect(0, 0, CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height);

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (grid[row][col]) {
				context.fillStyle = "green"; // Alive cell color
			} else {
				context.fillStyle = "white"; // Dead cell color
			}

			context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
			context.strokeStyle = "#000000";
			context.lineWidth = 0.5;
			context.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize); // Draw grid lines
		}
	}
}

export default function GOLCanvas({ rowsCols, grid, updateGrid }) {
	const canvasRef = useRef(null);

	const CANVAS_DIMENSIONS = {
		height: 700,
		width: 675,
	};

	const { rows, cols } = rowsCols;

	const cellSize = useMemo(() => {
		return Math.floor(
			Math.min(CANVAS_DIMENSIONS.width / cols, CANVAS_DIMENSIONS.height / rows)
		);
	}, [CANVAS_DIMENSIONS, rows, cols]);

	const handleCanvasClick = useCallback(
		(event) => {
			const canvas = canvasRef.current;
			const rect = canvas.getBoundingClientRect();

			// Get click coordinates relative to canvas
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			// Calculate which cell was clicked
			const clickedCol = Math.floor(x / cellSize);
			const clickedRow = Math.floor(y / cellSize);

			// Ensure click is within grid bounds
			if (clickedCol >= 0 && clickedCol < cols && clickedRow >= 0 && clickedRow < rows) {
				// Toggle cell state
				updateGrid(clickedRow, clickedCol);
			}
		},
		[cellSize, cols, updateGrid, rows]
	);

	useEffect(() => {
		const canvas = /** @type {HTMLCanvasElement} */ (canvasRef?.current);

		/** @type {CanvasRenderingContext2D} */
		const context = canvas?.getContext("2d");

		drawGrid({ grid, rows, cols, context, cellSize, canvas, CANVAS_DIMENSIONS });
	}, [grid, rows, cols, cellSize, CANVAS_DIMENSIONS, handleCanvasClick]);

	return (
		<canvas
			ref={canvasRef}
			width={CANVAS_DIMENSIONS.width}
			height={CANVAS_DIMENSIONS.height}
			onClick={handleCanvasClick}
		></canvas>
	);
}
