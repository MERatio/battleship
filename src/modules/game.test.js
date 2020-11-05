import game from './game';

test('game getShips method', () => {
	const ships = game.getShips();
	expect(ships.length).toBe(10);
	for (let i = 1; i < 5; i++) {
		const shipsByLength = ships.filter((ship) => ship.length === 5 - i);
		expect(shipsByLength.length).toBe(i);
	}
});
