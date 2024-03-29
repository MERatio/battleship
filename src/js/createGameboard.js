import { getRandomIntInclusive } from "./helpers";

function createGameboard() {
  const BOARD_SIZE = 10;
  let board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(null),
  );
  let ships = [];

  function placeShipInBoard(board, rowIndex, columnIndex, ship) {
    const isOutOfBounds = [rowIndex, columnIndex].some(
      (index) => index > BOARD_SIZE - 1,
    );
    if (isOutOfBounds || board[rowIndex][columnIndex] !== null) {
      throw new Error("Ship can only be placed on empty squares.");
    } else {
      board[rowIndex][columnIndex] = ship;
    }
  }

  function getRandomOrientation() {
    const orientations = ["horizontal", "vertical"];
    const randomIndex = Math.floor(Math.random() * orientations.length);
    return orientations[randomIndex];
  }

  return {
    getBoard() {
      return board.map((row) => [...row]);
    },
    placeShip(rowIndex, columnIndex, orientation, ship) {
      const boardCp = this.getBoard();
      if (orientation === "horizontal") {
        const columnEndIndex = columnIndex + ship.getLength();
        for (let i = columnIndex; i < columnEndIndex; i++) {
          placeShipInBoard(boardCp, rowIndex, i, ship);
        }
      } else {
        const rowEndIndex = rowIndex + ship.getLength();
        for (let i = rowIndex; i < rowEndIndex; i++) {
          placeShipInBoard(boardCp, i, columnIndex, ship);
        }
      }
      ships = [...ships, ship];
      board = boardCp;
    },
    receiveAttack(rowIndex, columnIndex) {
      switch (board[rowIndex][columnIndex]) {
        case null:
          board[rowIndex][columnIndex] = "miss";
          break;
        case "miss":
        case "hit":
          throw new Error("Square is already attacked.");
        default:
          board[rowIndex][columnIndex].hit();
          board[rowIndex][columnIndex] = "hit";
      }
    },
    areAllShipsSunk() {
      return ships.every((ship) => ship.isSunk());
    },
    randomlyPlaceShips(ships) {
      ships.forEach((ship) => {
        let shipPlaced = false;
        while (!shipPlaced) {
          const rowIndex = getRandomIntInclusive(0, 9);
          const columnIndex = getRandomIntInclusive(0, 9);
          const orientation = getRandomOrientation();
          try {
            this.placeShip(rowIndex, columnIndex, orientation, ship);
            shipPlaced = true;
          } catch (err) {
            // Intentional: I just want to call this.placeShip until that ship is placed.
          }
        }
      });
    },
  };
}

export default createGameboard;
