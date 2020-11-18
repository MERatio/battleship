import './cell.css';
import helpers from '../../modules/helpers/helpers';

const cell = (cell, gameboardObj, isMainPlayer, row, col, handleCellAttack) => {
	const cellDiv = document.createElement('div');
	cellDiv.classList.add('cell');
	cellDiv.dataset.row = row;
	cellDiv.dataset.col = col;
	if (!helpers.isCellVacant(cell)) {
		if (helpers.isMissedCell(cell)) {
			cellDiv.classList.add('cell-missed');
		} else if (helpers.isPart(cell) && cell.index === 0) {
			const shipObj = gameboardObj.findShip(cell.shipId);
			const shipDiv = document.createElement('div');
			shipDiv.classList.add('ship', 'pointer-events-none');
			if (shipObj.isSunk()) {
				shipDiv.classList.add('ship-sunk');
			}
			if (!shipObj.isHorizontal) {
				shipDiv.classList.add('ship-vertical');
			}
			shipObj.parts.forEach((part) => {
				const partDiv = document.createElement('div');
				partDiv.classList.add('part');
				if (helpers.isFunctionalPart && isMainPlayer) {
					partDiv.classList.add('part-functional');
				} else if (helpers.isPartHit(part)) {
					partDiv.classList.remove('part-functional');
					partDiv.classList.add('part-hit');
				}
				shipDiv.appendChild(partDiv);
			});
			cellDiv.appendChild(shipDiv);
		}
	}
	if (!isMainPlayer && handleCellAttack) {
		cellDiv.onclick = handleCellAttack;
	}
	return cellDiv;
};

export default cell;
