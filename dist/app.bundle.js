/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/createShip.js
function createShip(length) {
  let hits = 0;
  return {
    getLength() {
      return length;
    },
    hit() {
      if (this.isSunk()) {
        return false;
      } else {
        hits++;
        return true;
      }
    },
    isSunk() {
      return hits >= length;
    }
  };
}
/* harmony default export */ const js_createShip = (createShip);
;// CONCATENATED MODULE: ./src/js/helpers.js

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function generateShips() {
  return [js_createShip(5), js_createShip(4), js_createShip(3), js_createShip(3), js_createShip(2)];
}
;// CONCATENATED MODULE: ./src/js/createGameboard.js

function createGameboard() {
  const BOARD_SIZE = 10;
  let board = Array.from({
    length: BOARD_SIZE
  }, () => Array(BOARD_SIZE).fill(null));
  let ships = [];
  function placeShipInBoard(board, rowIndex, columnIndex, ship) {
    const isOutOfBounds = [rowIndex, columnIndex].some(index => index > BOARD_SIZE - 1);
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
      return board.map(row => [...row]);
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
      return ships.every(ship => ship.isSunk());
    },
    randomlyPlaceShips(ships) {
      ships.forEach(ship => {
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
    }
  };
}
/* harmony default export */ const js_createGameboard = (createGameboard);
;// CONCATENATED MODULE: ./src/js/createPlayer.js


function createPlayer(type) {
  function getRandomCoorsToAttack(board) {
    let rowIndex;
    let columnIndex;
    do {
      rowIndex = getRandomIntInclusive(0, 9);
      columnIndex = getRandomIntInclusive(0, 9);
    } while (board[rowIndex][columnIndex] === "miss" || board[rowIndex][columnIndex] === "hit");
    return {
      rowIndex,
      columnIndex
    };
  }
  return {
    type,
    gameboard: js_createGameboard(),
    attack(enemyGameboard, rowIndex, columnIndex) {
      enemyGameboard.receiveAttack(rowIndex, columnIndex);
    },
    randomAttack(enemyGameboard) {
      const enemyBoard = enemyGameboard.getBoard();
      const {
        rowIndex,
        columnIndex
      } = getRandomCoorsToAttack(enemyBoard);
      enemyGameboard.receiveAttack(rowIndex, columnIndex);
    }
  };
}
/* harmony default export */ const js_createPlayer = (createPlayer);
;// CONCATENATED MODULE: ./src/js/dom.js
const p1BoardContainer = document.querySelector(".p1BoardContainer");
const p2BoardContainer = document.querySelector(".p2BoardContainer");
function createSquareBtn(square, isActivePlayerBoard, rowIndex, columnIndex, onSquareBtnClick) {
  const squareBtn = document.createElement("button");
  squareBtn.classList.add("square");
  if (isActivePlayerBoard) {
    squareBtn.setAttribute("disabled", "");
    if (square && Object.prototype.hasOwnProperty.call(square, "isSunk")) {
      squareBtn.classList.add("ship");
    }
  } else {
    if (square !== "miss" && square !== "hit") {
      squareBtn.classList.add("square-to-attack");
      squareBtn.addEventListener("click", onSquareBtnClick);
    } else {
      squareBtn.setAttribute("disabled", "");
    }
  }
  if (square === "miss") {
    squareBtn.classList.add("miss");
  } else if (square === "hit") {
    squareBtn.classList.add("hit");
  }
  squareBtn.dataset.rowIndex = rowIndex;
  squareBtn.dataset.columnIndex = columnIndex;
  return squareBtn;
}
function renderBoard(el, board, isActivePlayerBoard, onSquareBtnClick) {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");
  board.forEach((row, i) => {
    row.forEach((square, j) => {
      const squareBtn = createSquareBtn(square, isActivePlayerBoard, i, j, onSquareBtnClick);
      boardDiv.append(squareBtn);
    });
  });
  el.append(boardDiv);
}
function clearBoards(boardContainers, onSquareBtnClick) {
  boardContainers.forEach(boardContainer => {
    const squareBtns = boardContainer.querySelectorAll(".square");
    squareBtns.forEach(squareBtn => {
      squareBtn.removeEventListener("click", onSquareBtnClick);
    });
    boardContainer.innerHTML = "";
  });
}
function disableBoard(boardContainer) {
  const squareBtns = boardContainer.querySelectorAll(".square");
  squareBtns.forEach(squareBtn => {
    squareBtn.classList.remove("square-to-attack");
    squareBtn.setAttribute("disabled", "");
  });
}
;// CONCATENATED MODULE: ./src/index.js






function getWinner() {
  if (p1.gameboard.areAllShipsSunk()) {
    return p2;
  } else if (p2.gameboard.areAllShipsSunk()) {
    return p1;
  } else {
    return null;
  }
}
function renderNewBoards() {
  clearBoards([p1BoardContainer, p2BoardContainer], handleSquareBtnClick);
  renderBoard(p1BoardContainer, p1.gameboard.getBoard(), true, handleSquareBtnClick);
  renderBoard(p2BoardContainer, p2.gameboard.getBoard(), false, handleSquareBtnClick);
}
function playerAttack(player, rowIndex, columnIndex) {
  try {
    if (player === p1) {
      p1.attack(p2.gameboard, rowIndex, columnIndex);
    } else {
      p2.randomAttack(p1.gameboard);
    }
    activePlayer = activePlayer === p1 ? p2 : p1;
    renderNewBoards();
    const winner = getWinner();
    if (winner) {
      // To render the change in board first, then alert.
      setTimeout(() => {
        alert(`${winner === p1 ? "Player 1" : "Player 2"} wins!`);
      }, 0);
      gameOver = true;
      disableBoard(p2BoardContainer);
      return;
    }
    if (activePlayer === p2) {
      playerAttack(p2);
    }
  } catch (err) {
    alert(err);
  }
}
function handleSquareBtnClick(e) {
  if (gameOver) {
    return;
  }
  const {
    rowIndex,
    columnIndex
  } = e.target.dataset;
  try {
    playerAttack(p1, Number(rowIndex), Number(columnIndex));
  } catch (err) {
    alert(err);
  }
}
const p1 = js_createPlayer("human");
const p2 = js_createPlayer("computer");
let activePlayer = p1;
const p1Ships = generateShips();
const p2Ships = generateShips();
let gameOver = false;
p1.gameboard.randomlyPlaceShips(p1Ships);
p2.gameboard.randomlyPlaceShips(p2Ships);
renderNewBoards();
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map