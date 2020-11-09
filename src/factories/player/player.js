import helpers from '../../modules/helpers/helpers';

const player = () => {
	const randomPlaceShips = (ownGameboard) => {
		for (let ship of helpers.getShips()) {
			let isShipPlaced = false;
			let direction = true;
			while (!isShipPlaced) {
				let row = Math.floor(Math.random() * 10);
				let col = Math.floor(Math.random() * 10);
				isShipPlaced = ownGameboard.placeShip(ship, direction, row, col);
				direction = !direction;
			}
		}
	};

	const randomAttack = (enemyGameboard) => {
		let isAttackValid = false;
		while (!isAttackValid) {
			let row = Math.floor(Math.random() * 10);
			let col = Math.floor(Math.random() * 10);
			isAttackValid = enemyGameboard.receiveAttack(row, col);
		}
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
