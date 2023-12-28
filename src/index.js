"use strict";

import "./style.css";
import createGameboard from "./js/createGameboard";
import * as dom from "./js/dom";
import { generateShips } from "./js/helpers";

function init() {
  const p1Gameboard = createGameboard();
  const p2Gameboard = createGameboard();
  const p1Ships = generateShips();
  const p2Ships = generateShips();
  p1Gameboard.randomlyPlaceShips(p1Ships);
  p2Gameboard.randomlyPlaceShips(p2Ships);
  dom.renderBoard(dom.p1BoardContainer, p1Gameboard.getBoard(), true);
  dom.renderBoard(dom.p2BoardContainer, p2Gameboard.getBoard(), false);
}

init();
