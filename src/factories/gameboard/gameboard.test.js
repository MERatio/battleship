import gameboard from './gameboard';
import ship from '../ship/ship';

let gameboardObj;
let shipObj;
let shipObj2;
let shipObj3;
let shipObj4;

beforeEach(() => {
	gameboardObj = gameboard(10);
	shipObj = ship(4);
	shipObj2 = ship(4);
	shipObj3 = ship(4);
	shipObj4 = ship(4);
});

// placeship method

test('gameboard placeShip method horizontal placement', () => {
	expect(gameboardObj.placeShip(shipObj, true, 0, 0)).toBe(true);
	for (let i = 0; i < shipObj.parts.length; i++) {
		expect(gameboardObj.getGameboard()[0][0 + i]).toBe(shipObj.parts[i]);
	}
	const isShipInluded = gameboardObj.getShips().includes(shipObj);
	expect(isShipInluded).toBe(true);
	expect(gameboardObj.placeShip(shipObj2, true, 9, 0)).toBe(true);
	expect(gameboardObj.placeShip(shipObj3, true, 0, 6)).toBe(true);
	expect(gameboardObj.placeShip(shipObj4, true, 9, 6)).toBe(true);
});

test('gameboard placeShip method vertical placement', () => {
	expect(gameboardObj.placeShip(shipObj, false, 0, 0)).toBe(true);
	for (let i = 0; i < shipObj.parts.length; i++) {
		expect(gameboardObj.getGameboard()[0 + i][0]).toBe(shipObj.parts[i]);
	}
	const isShipInluded = gameboardObj.getShips().includes(shipObj);
	expect(isShipInluded).toBe(true);
	expect(gameboardObj.placeShip(shipObj, false, 6, 0)).toBe(true);
	expect(gameboardObj.placeShip(shipObj, false, 0, 9)).toBe(true);
	expect(gameboardObj.placeShip(shipObj, false, 6, 9)).toBe(true);
});

test('gameboard placeShip if the cell is taken', () => {
	expect(gameboardObj.placeShip(shipObj, true, 2, 2)).toBe(true);
	expect(gameboardObj.placeShip(shipObj2, true, 2, 1)).toBe(false);
	for (let i = 0; i < shipObj.parts.length; i++) {
		expect(gameboardObj.getGameboard()[2][2 + i]).toBe(shipObj.parts[i]);
	}
});

test('gameboard placeShip if the surrounding 1x cell is taken (horizontal)', () => {
	expect(gameboardObj.placeShip(shipObj, true, 3, 3)).toBe(true);
	expect(gameboardObj.placeShip(shipObj2, true, 4, 3)).toBe(false);
	for (let i = 0; i < shipObj.parts.length; i++) {
		expect(gameboardObj.getGameboard()[3][3 + i]).toBe(shipObj.parts[i]);
	}
});

test('gameboard placeShip if the surrounding 1x cell is taken (vertical)', () => {
	expect(gameboardObj.placeShip(shipObj, false, 3, 3)).toBe(true);
	expect(gameboardObj.placeShip(shipObj2, false, 3, 4)).toBe(false);
	for (let i = 0; i < shipObj.parts.length; i++) {
		expect(gameboardObj.getGameboard()[3 + i][3]).toBe(shipObj.parts[i]);
	}
});

test('gameboard placeShip if a part of a ship is out of bounds', () => {
	expect(gameboardObj.placeShip(shipObj, true, 0, 7)).toBe(false);
	expect(gameboardObj.placeShip(shipObj2, true, 0, 9)).toBe(false);
	expect(gameboardObj.placeShip(shipObj3, false, 7, 0)).toBe(false);
	expect(gameboardObj.placeShip(shipObj4, false, 9, 0)).toBe(false);
});

// receiveAttack method

test('gameboard receiveAttack method if it hit a part of a ship', () => {
	expect(gameboardObj.placeShip(shipObj, true, 0, 2)).toBe(true);
	expect(gameboardObj.receiveAttack(0, 3)).toBe(true);
	const shotPart = shipObj.parts[1];
	expect(gameboardObj.getGameboard()[0][3]).toBe(shotPart);
	expect(shotPart.isHit).toBe(true);
});

test('gameboard receiveAttack method if the attack missed', () => {
	expect(gameboardObj.receiveAttack(0, 3)).toBe(true);
	expect(gameboardObj.getGameboard()[0][3]).toBe('missed');
});

test('gameboard receiveAttack if the cell is already attacked', () => {
	// If part of ship is already attacked
	expect(gameboardObj.placeShip(shipObj, true, 0, 2)).toBe(true);
	expect(gameboardObj.receiveAttack(0, 3)).toBe(true);
	expect(gameboardObj.receiveAttack(0, 3)).toBe(false);
	// If the attacked is missed, and it gets attacked again
	expect(gameboardObj.receiveAttack(5, 5)).toBe(true);
	expect(gameboardObj.receiveAttack(5, 5)).toBe(false);
});

// areAllShipsDestroyed method

test('gameboard areAllShipsDestroyed', () => {
	expect(gameboardObj.placeShip(shipObj, true, 0, 0)).toBe(true);
	expect(gameboardObj.placeShip(shipObj2, false, 6, 0)).toBe(true);
	// Shot all parts of first ship
	for (let i = 0; i < shipObj.parts.length; i++) {
		expect(gameboardObj.receiveAttack(0, 0 + i)).toBe(true);
	}
	expect(gameboardObj.areAllShipsDestroyed()).toBe(false);
	// Shot all parts of second ship
	for (let i = 0; i < shipObj2.parts.length; i++) {
		expect(gameboardObj.receiveAttack(6 + i, 0)).toBe(true);
	}
	expect(gameboardObj.areAllShipsDestroyed()).toBe(true);
});
