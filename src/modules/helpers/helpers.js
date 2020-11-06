import ship from '../../factories/ship/ship';

const helpers = (() => {
	const _shipCreator = (length, quantity) => {
		const ships = [];
		for (let i = 0; i < quantity; i++) {
			const shipObj = ship(length);
			ships.push(shipObj);
		}
		return ships;
	};

	const getShips = () => {
		const ships = [];
		for (let i = 1; i < 5; i++) {
			const createdShips = _shipCreator(5 - i, i);
			ships.push(...createdShips);
		}
		return ships;
	};

	return { getShips };
})();

export default helpers;
