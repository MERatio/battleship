import createGameboard from "./createGameboard";

function createPlayer(type) {
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomCoorsToAttack(board) {
    let rowIndex;
    let columnIndex;
    do {
      rowIndex = getRandomIntInclusive(0, 9);
      columnIndex = getRandomIntInclusive(0, 9);
    } while (
      board[rowIndex][columnIndex] === "miss" ||
      board[rowIndex][columnIndex] === "hit"
    );
    return { rowIndex, columnIndex };
  }

  return {
    type,
    gameboard: createGameboard(),
    attack(enemyGameboard, rowIndex, columnIndex) {
      enemyGameboard.receiveAttack(rowIndex, columnIndex);
    },
    randomAttack(enemyGameboard) {
      const enemyBoard = enemyGameboard.getBoard();
      const { rowIndex, columnIndex } = getRandomCoorsToAttack(enemyBoard);
      enemyGameboard.receiveAttack(rowIndex, columnIndex);
    },
  };
}

export default createPlayer;
