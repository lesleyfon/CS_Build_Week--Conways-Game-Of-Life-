import React from "react";
import {
	createGridToad,
	createGridBlinker,
	createGridGlider,
	createGridPulsar,
	createGridLWSS,
	createGridHWSS,
	createGridPenta_decathlon,
} from "./../utils/cgol_algorithm";
import "./header.css";

function Aside({ setGrid, setGeneration, setRunning, rowsCols, randomCells }) {
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

	return (
		<aside>
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
		</aside>
	);
}

export default Aside;
