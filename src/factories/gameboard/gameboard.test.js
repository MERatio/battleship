import gameboard from './gameboard';
import ship from '../ship/ship';

let gameboardObj;
let shipObj;
let shipObj2;
let shipObj3;
let shipObj4;
let shipObj5;
let shipObj6;
let shipObj7;
let shipObj8;

beforeEach(() => {
	gameboardObj = gameboard(10);
	shipObj = ship(4);
	shipObj2 = ship(4);
	shipObj3 = ship(4);
	shipObj4 = ship(4);
	shipObj5 = ship(4);
	shipObj6 = ship(4);
	shipObj7 = ship(4);
	shipObj8 = ship(4);
	const horizontalShips = [shipObj5, shipObj6, shipObj7, shipObj8];
	for (let horizontalShip of horizontalShips) {
		horizontalShip.isHorizontal = false;
	}
});

// placeship method

test('gameboard placeShip method horizontal placement', () => {
	expect(gameboardObj.placeShip(shipObj, 0, 0)).toBe(true);
	for (let i = 0; i < shipObj.parts.length; i++) {
		expect(gameboardObj.getGameboard()[0][0 + i]).toBe(shipObj.parts[i]);
	}
	const isShipInluded = gameboardObj.getShips().includes(shipObj);
	expect(isShipInluded).toBe(true);
	expect(gameboardObj.placeShip(shipObj2, 9, 0)).toBe(true);
	expect(gameboardObj.placeShip(shipObj3, 0, 6)).toBe(true);
	expect(gameboardObj.placeShip(shipObj4, 9, 6)).toBe(true);
});

test('gameboard placeShip method vertical placement', () => {
	expect(gameboardObj.placeShip(shipObj5, 0, 0)).toBe(true);
	for (let i = 0; i < shipObj5.parts.length; i++) {
		expect(gameboardObj.getGameboard()[0 + i][0]).toBe(shipObj5.parts[i]);
	}
	const isShipInluded = gameboardObj.getShips().includes(shipObj5);
	expect(isShipInluded).toBe(true);
	expect(gameboardObj.placeShip(shipObj6, 6, 0)).toBe(true);
	expect(gameboardObj.placeShip(shipObj7, 0, 9)).toBe(true);
	expect(gameboardObj.placeShip(shipObj8, 6, 9)).toBe(true);
});

test('gameboard placeShip if the cell is taken', () => {
	expect(gameboardObj.placeShip(shipObj, 2, 2)).toBe(true);
	expect(gameboardObj.placeShip(shipObj2, 2, 1)).toBe(false);
	for (let i = 0; i < shipObj.parts.length; i++) {
		expect(gameboardObj.getGameboard()[2][2 + i]).toBe(shipObj.parts[i]);
	}
});

test('gameboard placeShip if the surrounding 1x cell is taken (horizontal)', () => {
	expect(gameboardObj.placeShip(shipObj, 3, 3)).toBe(true);
	expect(gameboardObj.placeShip(shipObj2, 4, 3)).toBe(false);
	for (let i = 0; i < shipObj.parts.length; i++) {
		expect(gameboardObj.getGameboard()[3][3 + i]).toBe(shipObj.parts[i]);
	}
});

test('gameboard placeShip if the surrounding 1x cell is taken (vertical)', () => {
	expect(gameboardObj.placeShip(shipObj5, 3, 3)).toBe(true);
	expect(gameboardObj.placeShip(shipObj6, 3, 4)).toBe(false);
	for (let i = 0; i < shipObj5.parts.length; i++) {
		expect(gameboardObj.getGameboard()[3 + i][3]).toBe(shipObj5.parts[i]);
	}
});

test('gameboard placeShip if a part of a ship is out of bounds', () => {
	expect(gameboardObj.placeShip(shipObj, 0, 7)).toBe(false);
	expect(gameboardObj.placeShip(shipObj2, 0, 9)).toBe(false);
	expect(gameboardObj.placeShip(shipObj5, 7, 0)).toBe(false);
	expect(gameboardObj.placeShip(shipObj6, 9, 0)).toBe(false);
});

// receiveAttack method

test('gameboard receiveAttack method if it hit a part of a ship', () => {
	expect(gameboardObj.placeShip(shipObj, 0, 2)).toBe(true);
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
	expect(gameboardObj.placeShip(shipObj, 0, 2)).toBe(true);
	expect(gameboardObj.receiveAttack(0, 3)).toBe(true);
	expect(gameboardObj.receiveAttack(0, 3)).toBe(false);
	// If the attacked is missed, and it gets attacked again
	expect(gameboardObj.receiveAttack(5, 5)).toBe(true);
	expect(gameboardObj.receiveAttack(5, 5)).toBe(false);
});

// areAllShipsDestroyed method

test('gameboard areAllShipsDestroyed', () => {
	expect(gameboardObj.placeShip(shipObj, 0, 0)).toBe(true);
	expect(gameboardObj.placeShip(shipObj5, 6, 0)).toBe(true);
	// Shot all parts of first ship
	for (let i = 0; i < shipObj.parts.length; i++) {
		expect(gameboardObj.receiveAttack(0, 0 + i)).toBe(true);
	}
	expect(gameboardObj.areAllShipsDestroyed()).toBe(false);
	// Shot all parts of second ship
	for (let i = 0; i < shipObj5.parts.length; i++) {
		expect(gameboardObj.receiveAttack(6 + i, 0)).toBe(true);
	}
	expect(gameboardObj.areAllShipsDestroyed()).toBe(true);
});
