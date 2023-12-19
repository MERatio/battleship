import createPlayer from "./createPlayer";

let playerA;
let playerB;

beforeEach(() => {
  playerA = createPlayer("human");
  playerB = createPlayer("computer");
});

it("have required properties, and methods", () => {
  expect(playerA).toMatchObject({
    type: "human",
    gameboard: expect.any(Object),
    attack: expect.any(Function),
    randomAttack: expect.any(Function),
  });
});

it("has gameboard object", () => {
  expect(playerA).toMatchObject({
    gameboard: expect.any(Object),
  });
  const board = playerA.gameboard.getBoard();
  expect(board.length).toBe(10);
  board.forEach((row) => {
    expect(row.length).toBe(10);
    row.forEach((square) => {
      expect(square).toBeNull();
    });
  });
});

describe("attack", () => {
  it("calls enemy gameboard's .receiveAttack()", () => {
    const receiveAttackSpy = jest.spyOn(playerB.gameboard, "receiveAttack");
    playerA.attack(playerB.gameboard, 0, 0);
    expect(receiveAttackSpy).toHaveBeenCalledWith(0, 0);
  });
});

describe("randomAttack", () => {
  it("legal random attack on enemy's board", () => {
    playerA.randomAttack(playerB.gameboard);
    const nullsAndMisses = playerB.gameboard.getBoard().reduce(
      (acc, row) => {
        for (const square of row) {
          if (square === null) {
            acc.nulls++;
          } else if (square === "miss") {
            acc.misses++;
          }
        }
        return acc;
      },
      { nulls: 0, misses: 0 },
    );
    expect(nullsAndMisses.nulls).toBe(99);
    expect(nullsAndMisses.misses).toBe(1);
  });

  it("can attacks all squares on enemy's board given enough turns", () => {
    for (let i = 0; i < 100; i++) {
      playerA.randomAttack(playerB.gameboard);
    }
    const misses = playerB.gameboard.getBoard().reduce((acc, row) => {
      for (const square of row) {
        if (square === "miss") {
          acc++;
        }
      }
      return acc;
    }, 0);
    expect(misses).toBe(100);
  });
});
