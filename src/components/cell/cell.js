import './cell.css';
import ship from '../ship/ship';
import helpers from '../../modules/helpers/helpers';

const cell = (
	cell,
	gameboardObj,
	isMainPlayer,
	row,
	col,
	handleCellAttack,
	handleShipDragStart,
	handleCellDrop,
	handleShipClick
) => {
	const cellDiv = document.createElement('div');
	cellDiv.classList.add('cell');
	cellDiv.dataset.row = row;
	cellDiv.dataset.col = col;
	if (isMainPlayer) {
		const allowDrop = (e) => {
			// Prevent default to allow drop
			e.preventDefault();
		};
		cellDiv.addEventListener('dragover', allowDrop);
		cellDiv.addEventListener('drop', handleCellDrop);
	}
	if (!helpers.isCellVacant(cell)) {
		if (helpers.isMissedCell(cell)) {
			cellDiv.classList.add('cell-missed');
		} else if (helpers.isPart(cell) && cell.index === 0) {
			const shipDiv = ship(
				cell,
				gameboardObj,
				isMainPlayer,
				handleShipDragStart,
				handleShipClick
			);
			cellDiv.appendChild(shipDiv);
		}
	}
	if (!isMainPlayer && handleCellAttack) {
		cellDiv.onclick = handleCellAttack;
	}
	return cellDiv;
};

export default cell;
