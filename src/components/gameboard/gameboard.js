import './gameboard.css';
import cell from '../cell/cell';

const gameboard = (
	gameboardObj,
	name,
	isDisabled,
	isMainPlayer,
	handleCellAttack,
	handleShipDragStart,
	handleCellDrop
) => {
	const gameboardDiv = document.createElement('div');
	gameboardDiv.classList.add('gameboard');
	gameboardDiv.dataset.name = name;
	if (isDisabled) {
		gameboardDiv.classList.add('disabled-gameboard');
	} else {
		gameboardDiv.classList.remove('disabled-gameboard');
	}
	gameboardObj.getGameboard().forEach((row, rowIndex) => {
		row.forEach((col, colIndex) => {
			gameboardDiv.appendChild(
				cell(
					col,
					gameboardObj,
					isMainPlayer,
					rowIndex,
					colIndex,
					handleCellAttack,
					handleShipDragStart,
					handleCellDrop
				)
			);
		});
	});
	return gameboardDiv;
};

export default gameboard;
