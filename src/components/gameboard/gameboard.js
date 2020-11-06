import './gameboard.css';

const gameboard = (gameboardObj) => {
	const gameboardDiv = document.createElement('div');
	gameboardDiv.classList.add('gameboard');

	gameboardObj.forEach((row) => {
		row.forEach((col) => {
			const cellDiv = document.createElement('div');
			cellDiv.classList.add('cell');
			gameboardDiv.appendChild(cellDiv);
		});
	});

	return gameboardDiv;
};

export default gameboard;
