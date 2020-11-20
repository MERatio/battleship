import helpers from '../../modules/helpers/helpers';

const player = () => {
	const randomPlaceShips = (ownGameboard) => {
		for (let ship of helpers.getShips()) {
			let isShipPlaced = false;
			while (!isShipPlaced) {
				let row = Math.floor(Math.random() * 10);
				let col = Math.floor(Math.random() * 10);
				isShipPlaced = ownGameboard.placeShip(ship, row, col);
				if (!isShipPlaced) {
					ship.isHorizontal = !ship.isHorizontal;
					isShipPlaced = ownGameboard.placeShip(ship, row, col);
				}
			}
		}
	};

	const randomAttack = (enemyGameboard) => {
		let isAttackValid = false;
		let row;
		let col;
		while (!isAttackValid) {
			row = Math.floor(Math.random() * 10);
			col = Math.floor(Math.random() * 10);
			isAttackValid = enemyGameboard.receiveAttack(row, col);
		}
		const cell = enemyGameboard.getGameboard()[row][col];
		return helpers.isPartHit(cell);
	};

	const attack = (enemyGameboard, row, col) => {
		enemyGameboard.receiveAttack(row, col);
		const cell = enemyGameboard.getGameboard()[row][col];
		return helpers.isPartHit(cell);
	};

	return {
		randomPlaceShips,
		randomAttack,
		attack,
	};
};

export default player;
