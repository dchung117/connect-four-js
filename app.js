document.addEventListener("DOMContentLoaded", () => {
	// create board
	const numCells = 49
	const grid = document.querySelector(".grid")
	for (let i=0; i<numCells; i++) {
		gridSquare = document.createElement("div")
		if (i >= 42) { // last row is taken
			gridSquare.classList.add("taken")
		}
		grid.appendChild(gridSquare)
	}

	// get grid squares
	const gridSquares = document.querySelectorAll(".grid div")

	// get result display, current player display
	const resultDisplay = document.querySelector("#result")
	const currentPlayerDisplay = document.querySelector("#current-player")

	// initialize current player
	let currentPlayer = 1
	currentPlayerDisplay.textContent = currentPlayer
	const playerMap = new Map()
	playerMap.set("player-one", 1)
	playerMap.set("player-two", 2)

	// function to check for win or tie
	const winningArrays = [
		[0, 1, 2, 3],
		[41, 40, 39, 38],
		[7, 8, 9, 10],
		[34, 33, 32, 31],
		[14, 15, 16, 17],
		[27, 26, 25, 24],
		[21, 22, 23, 24],
		[20, 19, 18, 17],
		[28, 29, 30, 31],
		[13, 12, 11, 10],
		[35, 36, 37, 38],
		[6, 5, 4, 3],
		[0, 7, 14, 21],
		[41, 34, 27, 20],
		[1, 8, 15, 22],
		[40, 33, 26, 19],
		[2, 9, 16, 23],
		[39, 32, 25, 18],
		[3, 10, 17, 24],
		[38, 31, 24, 17],
		[4, 11, 18, 25],
		[37, 30, 23, 16],
		[5, 12, 19, 26],
		[36, 29, 22, 15],
		[6, 13, 20, 27],
		[35, 28, 21, 14],
		[0, 8, 16, 24],
		[41, 33, 25, 17],
		[7, 15, 23, 31],
		[34, 26, 18, 10],
		[14, 22, 30, 38],
		[27, 19, 11, 3],
		[35, 29, 23, 17],
		[6, 12, 18, 24],
		[28, 22, 16, 10],
		[13, 19, 25, 31],
		[21, 15, 9, 3],
		[20, 26, 32, 38],
		[36, 30, 24, 18],
		[5, 11, 17, 23],
		[37, 31, 25, 19],
		[4, 10, 16, 22],
		[2, 10, 18, 26],
		[39, 31, 23, 15],
		[1, 9, 17, 25],
		[40, 32, 24, 16],
		[9, 17, 25, 33],
		[8, 16, 24, 32],
		[11, 17, 23, 29],
		[12, 18, 24, 30],
		[1, 2, 3, 4],
		[5, 4, 3, 2],
		[8, 9, 10, 11],
		[12, 11, 10, 9],
		[15, 16, 17, 18],
		[19, 18, 17, 16],
		[22, 23, 24, 25],
		[26, 25, 24, 23],
		[29, 30, 31, 32],
		[33, 32, 31, 30],
		[36, 37, 38, 39],
		[40, 39, 38, 37],
		[7, 14, 21, 28],
		[8, 15, 22, 29],
		[9, 16, 23, 30],
		[10, 17, 24, 31],
		[11, 18, 25, 32],
		[12, 19, 26, 33],
		[13, 20, 27, 34],
	  ]
	function checkBoard() {
		// loop through each win condition, check for win
		for (let i=0; i<winningArrays.length; i++) {
			// get player occupances
			const playerOccupants = winningArrays[i].map(idx => {
				if (gridSquares[idx].classList.contains("player-one")) {
					return playerMap.get("player-one")
				} else if (gridSquares[idx].classList.contains("player-two")) {
					return playerMap.get("player-two")
				} else {
					return 0
				}
			})

			// check if player connected four
			if (playerOccupants.every(value => value === playerMap.get("player-one"))) {
				// player one wins
				resultDisplay.textContent = "PLAYER ONE WINS!!"
				currentPlayerDisplay.textContent = ""

				// stop listening for events
				gridSquares.forEach(square => square.onclick = null)
				return
			} else if (playerOccupants.every(value => value === playerMap.get("player-two"))) {
				// player two wins
				resultDisplay.textContent = "PLAYER TWO WINS!!"
				currentPlayerDisplay.textContent = ""

				// stop listening for events
				gridSquares.forEach(square => square.onclick = null)
				return
			}
		}

		// check if the game is tied
		const gridSquaresArray = Array.from(gridSquares)
		if (gridSquaresArray.every(square => square.classList.contains("taken"))) {
			resultDisplay.textContent = "TIE GAME"
			currentPlayerDisplay.textContent = ""

			// stop listening for events
			gridSquares.forEach(square => square.onclick = null)
		}
	}

	function changeSquare(square, i) {
		// check if square below selected is taken
		if (!square.classList.contains("taken") && gridSquares[i+7].classList.contains("taken")) {
			if (currentPlayer === 1) {
				square.classList.add("taken", "player-one")

				// change current player
				currentPlayer = playerMap.get("player-two")
				currentPlayerDisplay.textContent = currentPlayer
			} else {
				square.classList.add("taken", "player-two")

				// change current player
				currentPlayer = playerMap.get("player-one")
				currentPlayerDisplay.textContent = currentPlayer
			}
		} else alert("Illegal move.")

		// check for win or tie
		checkBoard()
	}

	// add click event listener for each grid square
	gridSquares.forEach((square, i) => square.onclick = () => changeSquare(square, i))
})
