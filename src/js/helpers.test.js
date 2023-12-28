import { generateShips } from "./helpers";
import createShip from "./createShip";

jest.mock("./createShip");

describe(".generateShips()", () => {
  it("generates the 5 ships", () => {
    const ships = generateShips();
    expect(createShip.mock.calls).toHaveLength(5);
    expect(ships.length).toBe(5);
  });
});
