"use strict";

import "./style.css";
import createGameboard from "./js/createGameboard";
import * as dom from "./js/dom";

function init() {
  const p1Gameboard = createGameboard();
  const p2Gameboard = createGameboard();
  dom.renderBoard(dom.p1BoardContainer, p1Gameboard.getBoard());
  dom.renderBoard(dom.p2BoardContainer, p2Gameboard.getBoard());
}

init();
