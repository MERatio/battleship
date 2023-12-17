import createShip from "./createShip";

const SHIP_LENGTH = 5;
let ship;

beforeEach(() => {
  ship = createShip(SHIP_LENGTH);
});

describe(".getLength()", () => {
  it("returns the length", () => {
    expect(ship.getLength()).toBe(SHIP_LENGTH);
  });
});

describe(".hit()", () => {
  it("returns false if ship is already sunk; otherwise, returns false", () => {
    for (let i = 0; i < SHIP_LENGTH; i++) {
      expect(ship.hit()).toBe(true);
    }
    expect(ship.hit()).toBe(false);
  });
});

describe(".isSunk()", () => {
  it("returns true if the ship is sunk; otherwise, returns false.", () => {
    for (let i = 0; i < SHIP_LENGTH - 1; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
