import React, { useEffect, useRef, useMemo } from "react";

function drawGrid({ grid, rows, cols, canvas, context, cellSize, CANVAS_DIMENSIONS }) {
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

export default function GOLCanvas({ rowsCols, grid, running, updateGrid }) {
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

	useEffect(() => {
		const canvas = /** @type {HTMLCanvasElement} */ (canvasRef?.current);

		const context = canvas?.getContext("2d");

		drawGrid({ grid, rows, cols, context, cellSize, canvas, CANVAS_DIMENSIONS });
	}, [grid, rows, cols, cellSize, CANVAS_DIMENSIONS]);

	return (
		<canvas
			ref={canvasRef}
			width={CANVAS_DIMENSIONS.width}
			height={CANVAS_DIMENSIONS.height}
		></canvas>
	);
}
