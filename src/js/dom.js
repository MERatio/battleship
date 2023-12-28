export const p1BoardContainer = document.querySelector(".p1BoardContainer");
export const p2BoardContainer = document.querySelector(".p2BoardContainer");

export function renderBoard(el, board) {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");
  board.forEach((row, i) => {
    row.forEach((square, j) => {
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.dataset.rowIndex = i;
      squareDiv.dataset.columnIndex = j;
      boardDiv.append(squareDiv);
    });
  });
  el.append(boardDiv);
}
