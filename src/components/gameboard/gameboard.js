import './gameboard.css';
import cell from '../cell/cell';

const gameboard = (
	gameboardObj,
	name,
	isDisabled,
	isMainPlayer,
	handleCellAttack
) => {
	const gameboardDiv = document.createElement('div');
	gameboardDiv.classList.add('gameboard');
	gameboardDiv.dataset.name = name;
	if (isDisabled) {
		gameboardDiv.classList.add('disabled-gameboard');
	} else {
		gameboardDiv.classList.remove('disabled-gameboard');
	}
	gameboardObj.forEach((row, rowIndex) => {
		row.forEach((col, colIndex) => {
			gameboardDiv.appendChild(
				cell(col, isMainPlayer, rowIndex, colIndex, handleCellAttack)
			);
		});
	});
	return gameboardDiv;
};

export default gameboard;
