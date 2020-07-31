import React from "react";

function About() {
	return (
		<div
			className="about"
			style={{
				width: "600px",
				backgroundColor: "#ffffff",
				margin: "20px auto",
				height: "100%",
				padding: "20px",
			}}
		>
			<h1>Game of Life (GOL)/ Life</h1>
			<p>
				The Game Of Life(GOL) which is also know as Life was created by a British
				mathematician called John Horton Conway in 1970. This game is a class of descrete
				model know as Cellular Automaton.
			</p>
			<h3>Cellular Automaton:</h3>

			<p>
				A Cellular automaton (cellular automata in plural) also know as CA is a descrete
				model studied in automata theory.
			</p>
			<p>
				It is a program that operates on data that is typically stored in n dimensional
				grids (1D, 2D, 3D ect ).
			</p>
			<p>
				Each program has a set of rules that describe how the value of each cells of the
				grid change over time, often as a result of a cells neighboring cells lives. Each
				cell has a finite number of state, such as on and off or alive and death.
			</p>
			<p>
				The total count of neighbor cells depend on the rules of the program. Sometimes we
				consider 4 neighbors which includes the 4 orthogonally adjacent cells; sometimes it
				includes 8 surrounding cells including the diagonal cells.
			</p>
			<p>
				Each round of the simulation examines the current state of the grid, and then
				produces an entirely new grid consisting of the old state.
			</p>
			<p>
				The new grid becomse the current state of the game/simulation and the process
				repeats.
			</p>
			<p>Each new grid after a simulation can be referred to as a generation.</p>
			<p>
				The cellular Automata concept was discovered in the 1940s by Stanislaw Ulam and John
				Von Neumann.
			</p>

			<p>
				The game of Life is a zero player game, which means the evolution of the game is
				determined by its initial state, requiring no further input.
			</p>

			<p>
				Anyone interacts with the game by creating an initial configuration for the game and
				watch the game evolve over each generation.
			</p>

			<p>
				It is a `Turing complete` and can simulate the universal constructor of any other
				`Turing machine.`
			</p>

			<p>
				We say a system is Turing complete if its capable of performing an arbitrary,
				general purpose computation. This means that this system is able to recognize or
				decide other data-manipulation rule sets.{" "}
			</p>

			<p>
				Turing completeness is used as a way to express the power of such a
				data-manipulation rule set.{" "}
			</p>

			<p>
				The concept is named after English mathematician and computer scientist Alan Turing.
			</p>

			<p>
				The game of life is an infinite 2D Orthogonal grid square cells, each of which is
				one of two possible state. Live or Dead( populated or unpopulated).{" "}
			</p>

			<p>
				Every cell interacts with its eight neighbours, which are the cells that are
				horizontally, vertically, or diagonally adjacent i.e (up, down, left, right, and
				diagonals)
			</p>
			<p>
				During each generation the following rules are applied to each cell to determine
				their next state in the next generation
			</p>
			<ol>
				<li>Any live cells with than 2 or 3 live neighbor survives.</li>
				<li>Any dead cell with 3 live neighbor becomes alive in the next generation</li>
				<li>
					All other live cells die in the next generation. Similarly, all other dead cells
					stay dead.
				</li>
			</ol>
		</div>
	);
}

export default About;
