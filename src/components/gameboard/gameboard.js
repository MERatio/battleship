import './gameboard.css';
import cell from '../cell/cell';

const gameboard = (gameboardObj, isMainPlayer) => {
	const gameboardDiv = document.createElement('div');
	gameboardDiv.classList.add('gameboard');
	gameboardObj.forEach((row) => {
		row.forEach((col) => {
			gameboardDiv.appendChild(cell(col, isMainPlayer));
		});
	});
	return gameboardDiv;
};

export default gameboard;
