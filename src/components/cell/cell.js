import './cell.css';
import helpers from '../../modules/helpers/helpers';

const cell = (cell, isMainPlayer, row, col, handleCellAttack) => {
	const cellDiv = document.createElement('div');
	cellDiv.classList.add('cell');
	cellDiv.dataset.row = row;
	cellDiv.dataset.col = col;
	if (!helpers.isCellVacant(cell)) {
		if (helpers.isMissedCell(cell)) {
			cellDiv.classList.add('missed-cell');
		} else if (helpers.isFunctionalPart(cell)) {
			if (isMainPlayer) {
				cellDiv.classList.add('functional-part');
			}
		} else if (helpers.isPartHit(cell)) {
			cellDiv.classList.add('hit-part');
		}
		// TODO render ship destroyed
	}
	if (!isMainPlayer) {
		cellDiv.onclick = handleCellAttack;
	}
	return cellDiv;
};

export default cell;
