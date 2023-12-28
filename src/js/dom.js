export const p1BoardContainer = document.querySelector(".p1BoardContainer");
export const p2BoardContainer = document.querySelector(".p2BoardContainer");

export function renderBoard(el, board, showShips) {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");
  board.forEach((row, i) => {
    row.forEach((square, j) => {
      const squareDiv = document.createElement("button");
      squareDiv.classList.add("square");
      if (
        showShips &&
        square &&
        Object.prototype.hasOwnProperty.call(square, "isSunk")
      ) {
        squareDiv.classList.add("ship");
      }
      squareDiv.dataset.rowIndex = i;
      squareDiv.dataset.columnIndex = j;
      boardDiv.append(squareDiv);
    });
  });
  el.append(boardDiv);
}
