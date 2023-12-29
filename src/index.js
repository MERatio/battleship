"use strict";

import "./style.css";
import createPlayer from "./js/createPlayer";
import * as dom from "./js/dom";
import { generateShips } from "./js/helpers";

function init() {
  const p1 = createPlayer("human");
  const p2 = createPlayer("computer");
  const p1Gameboard = p1.gameboard;
  const p2Gameboard = p2.gameboard;
  const p1Ships = generateShips();
  const p2Ships = generateShips();
  p1Gameboard.randomlyPlaceShips(p1Ships);
  p2Gameboard.randomlyPlaceShips(p2Ships);
  dom.renderBoard(dom.p1BoardContainer, p1Gameboard.getBoard(), true);
  dom.renderBoard(dom.p2BoardContainer, p2Gameboard.getBoard(), false);
}

init();
