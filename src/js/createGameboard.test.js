import createGameboard from "./createGameboard";
import createShip from "./createShip";

let gameboard;

beforeEach(() => {
  gameboard = createGameboard();
});

describe(".getBoard()", () => {
  it("returns 2d array board full of null initially", () => {
    expect(gameboard.getBoard().length).toBe(10);
    gameboard.getBoard().forEach((row) => {
      expect(row.length).toBe(10);
      row.forEach((square) => {
        expect(square).toBeNull();
      });
    });
  });
});

describe(".placeShip()", () => {
  let carrier;
  let battleship;
  const errMsg = "Ship can only be placed on empty squares.";

  beforeEach(() => {
    carrier = createShip(5);
    battleship = createShip(4);
  });

  it("throws an error if we try to place a ship on top of another ship", () => {
    gameboard.placeShip(0, 0, "horizontal", carrier);
    expect(() => gameboard.placeShip(0, 0, "horizontal", battleship)).toThrow(
      errMsg,
    );
    expect(() => gameboard.placeShip(0, 1, "horizontal", battleship)).toThrow(
      errMsg,
    );
  });

  it('throws an error if we try to to place a ship on a square with "miss"', () => {
    gameboard.receiveAttack(0, 0);
    expect(() => gameboard.placeShip(0, 0, "horizontal", carrier)).toThrow(
      errMsg,
    );
  });

  it('throws an error if we try to to place a ship on a square with "hit"', () => {
    gameboard.placeShip(0, 0, "horizontal", carrier);
    gameboard.receiveAttack(0, 0);
    expect(() => gameboard.placeShip(0, 0, "horizontal", battleship)).toThrow(
      errMsg,
    );
  });

  it("throws an error if we try to place a ship out of bounds", () => {
    expect(() => gameboard.placeShip(0, 9, "horizontal", carrier)).toThrow(
      errMsg,
    );
    expect(() => gameboard.placeShip(9, 0, "vertically", carrier)).toThrow(
      errMsg,
    );
  });

  it("place a ship at specific coordinates horizontally", () => {
    const rowIndex = 0;
    gameboard.placeShip(rowIndex, 0, "horizontal", carrier);
    for (let i = 0; i < carrier.getLength(); i++) {
      expect(gameboard.getBoard()[rowIndex][i]).toBe(carrier);
    }
  });

  it("place a ship at specific coordinates vertically", () => {
    const columnIndex = 0;
    gameboard.placeShip(0, columnIndex, "vertically", carrier);
    for (let i = 0; i < carrier.getLength(); i++) {
      expect(gameboard.getBoard()[i][columnIndex]).toBe(carrier);
    }
  });

  it("returns undefined if it places a ship successfully", () => {
    expect(gameboard.placeShip(0, 0, "horizontal", carrier)).toBeUndefined();
  });
});

describe(".receiveAttack()", () => {
  let carrier;
  let errMsg = "Square is already attacked.";

  beforeEach(() => {
    carrier = createShip(5);
    gameboard.placeShip(0, 0, "horizontal", carrier);
  });

  it("throws an error if square is already attacked", () => {
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    expect(() => gameboard.receiveAttack(0, 0)).toThrow(errMsg);
    expect(() => gameboard.receiveAttack(1, 0)).toThrow(errMsg);
  });

  it('add a "miss" in the square if attack misses', () => {
    gameboard.receiveAttack(9, 9);
    expect(gameboard.getBoard()[9][9]).toBe("miss");
  });

  it('add a "hit" in the square if it hits a ship', () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.getBoard()[0][0]).toBe("hit");
  });

  it("sunks a ship if all of its parts are hit", () => {
    expect(carrier.isSunk()).toBe(false);
    for (let i = 0; i < carrier.getLength(); i++) {
      gameboard.receiveAttack(0, i);
    }
    expect(carrier.isSunk()).toBe(true);
  });

  it("returns undefined if it successfully received an attack", () => {
    expect(gameboard.receiveAttack(0, 0)).toBeUndefined();
    expect(gameboard.receiveAttack(9, 9)).toBeUndefined();
  });
});

describe(".areAllShipsSunk()", () => {
  it("returns true if all ships are sunk; otherwise, returns false", () => {
    expect(gameboard.areAllShipsSunk()).toBe(true);
    const carrier = createShip(5);
    gameboard.placeShip(0, 0, "horizontal", carrier);
    expect(gameboard.areAllShipsSunk()).toBe(false);
    for (let i = 0; i < carrier.getLength(); i++) {
      gameboard.receiveAttack(0, i);
      if (i < carrier.getLength() - 1) {
        expect(gameboard.areAllShipsSunk()).toBe(false);
      }
    }
    expect(gameboard.areAllShipsSunk()).toBe(true);
  });
});
