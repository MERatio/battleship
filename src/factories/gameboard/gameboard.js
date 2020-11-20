import helpers from '../../modules/helpers/helpers';

const gameboard = (size) => {
	const _matrix = (size) => {
		const matrix = [];
		for (let i = 0; i < size; i++) {
			matrix.push(new Array(size).fill(null));
		}
		return matrix;
	};

	const gameboard = _matrix(size);
	let ships = [];

	const _containsInvalidCoordinates = (...coors) => {
		return coors.some((coor) => coor < 0 || coor > size - 1);
	};

	const _isCellValid = (row, col) => {
		if (
			_containsInvalidCoordinates(row, col) ||
			!helpers.isCellVacant(gameboard[row][col])
		) {
			return false;
		}
		for (let i = row - 1; i <= row + 1; i++) {
			for (let j = col - 1; j <= col + 1; j++) {
				if (_containsInvalidCoordinates(i, j)) {
					continue;
				}
				if (!helpers.isCellVacant(gameboard[i][j])) {
					return false;
				}
			}
		}
		return true;
	};

	const _placeParts = (parts, isHorizontal, row, col) => {
		for (let i = 0; i < parts.length; i++) {
			if (isHorizontal) {
				gameboard[row][col + i] = parts[i];
			} else {
				gameboard[row + i][col] = parts[i];
			}
		}
	};

	const findShip = (shipId) => {
		return ships.find((ship) => ship.id === shipId);
	};

	const getGameboard = () => gameboard;

	const getShips = () => ships;

	const isPlacementValid = (shipLength, isHorizontal, row, col) => {
		for (let i = 0; i < shipLength; i++) {
			if (isHorizontal) {
				if (!_isCellValid(row, col + i)) {
					return false;
				}
			} else {
				if (!_isCellValid(row + i, col)) {
					return false;
				}
			}
		}
		return true;
	};

	const placeShip = (ship, row, col) => {
		if (isPlacementValid(ship.length, ship.isHorizontal, row, col)) {
			ships.push(ship);
			_placeParts(ship.parts, ship.isHorizontal, row, col);
			return true;
		}
		return false;
	};

	const receiveAttack = (row, col) => {
		const cell = gameboard[row][col];
		if (helpers.isValidCellToAttack(cell)) {
			if (helpers.isCellVacant(cell)) {
				gameboard[row][col] = 'missed';
			} else if (helpers.isFunctionalPart(cell)) {
				const ship = findShip(cell.shipId);
				ship.hit(cell.index);
			}
			return true;
		}
		return false;
	};

	const areAllShipsDestroyed = () => {
		return ships.every((ship) => ship.isSunk());
	};

	const emptyGameboard = () => {
		for (let i = 0; i < gameboard.length; i++) {
			for (let j = 0; j < gameboard[i].length; j++) {
				if (gameboard[i][j]) {
					gameboard[i][j] = null;
				}
			}
		}
		ships.length = 0;
	};

	const removeShip = (ship) => {
		const shipId = ship.id;
		for (let i = 0; i < gameboard.length; i++) {
			for (let j = 0; j < gameboard[i].length; j++) {
				if (gameboard[i][j] && gameboard[i][j].shipId === shipId) {
					gameboard[i][j] = null;
				}
			}
		}
		ships = ships.filter((el) => el !== ship);
	};

	return {
		size,
		findShip,
		getGameboard,
		getShips,
		isPlacementValid,
		placeShip,
		receiveAttack,
		areAllShipsDestroyed,
		emptyGameboard,
		removeShip,
	};
};

export default gameboard;
