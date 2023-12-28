export const p1BoardContainer = document.querySelector(".p1BoardContainer");
export const p2BoardContainer = document.querySelector(".p2BoardContainer");

function createSquareBtn(square, isActivePlayerBoard, rowIndex, columnIndex) {
  const squareBtn = document.createElement("button");
  squareBtn.classList.add("square");
  if (
    isActivePlayerBoard &&
    square &&
    Object.prototype.hasOwnProperty.call(square, "isSunk")
  ) {
    squareBtn.classList.add("ship");
  }
  if (isActivePlayerBoard) {
    squareBtn.classList.add("cursor-auto");
    squareBtn.setAttribute("disabled", "");
  }
  squareBtn.dataset.rowIndex = rowIndex;
  squareBtn.dataset.columnIndex = columnIndex;
  return squareBtn;
}

export function renderBoard(el, board, isActivePlayerBoard) {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");
  board.forEach((row, i) => {
    row.forEach((square, j) => {
      const squareBtn = createSquareBtn(square, isActivePlayerBoard, i, j);
      boardDiv.append(squareBtn);
    });
  });
  el.append(boardDiv);
}
