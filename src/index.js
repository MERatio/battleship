"use strict";

import "./style.css";
import createPlayer from "./js/createPlayer";
import * as dom from "./js/dom";
import { generateShips } from "./js/helpers";

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
  dom.clearBoards(
    [dom.p1BoardContainer, dom.p2BoardContainer],
    handleSquareBtnClick,
  );
  dom.renderBoard(
    dom.p1BoardContainer,
    p1.gameboard.getBoard(),
    activePlayer === p1,
    handleSquareBtnClick,
  );
  dom.renderBoard(
    dom.p2BoardContainer,
    p2.gameboard.getBoard(),
    activePlayer === p2,
    handleSquareBtnClick,
  );
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
      dom.disableBoard(
        activePlayer === p1 ? dom.p2BoardContainer : dom.p1BoardContainer,
      );
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

  const { rowIndex, columnIndex } = e.target.dataset;
  try {
    playerAttack(p1, Number(rowIndex), Number(columnIndex));
  } catch (err) {
    alert(err);
  }
}

const p1 = createPlayer("human");
const p2 = createPlayer("computer");
let activePlayer = p1;
const p1Ships = generateShips();
const p2Ships = generateShips();
let gameOver = false;
p1.gameboard.randomlyPlaceShips(p1Ships);
p2.gameboard.randomlyPlaceShips(p2Ships);
renderNewBoards();
