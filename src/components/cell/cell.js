import './cell.css';
import helpers from '../../modules/helpers/helpers';

const cell = (cell, isMainPlayer) => {
	const cellDiv = document.createElement('div');
	cellDiv.classList.add('cell');
	if (!helpers.isCellVacant(cell)) {
		if (helpers.isMissedCell(cell)) {
		} else if (helpers.isFunctionalPart(cell)) {
			if (isMainPlayer) {
				cellDiv.classList.add('functional-part');
			}
		}
	}
	return cellDiv;
};

export default cell;
