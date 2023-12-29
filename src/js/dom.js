export const p1BoardContainer = document.querySelector(".p1BoardContainer");
export const p2BoardContainer = document.querySelector(".p2BoardContainer");

function createSquareBtn(
  square,
  isActivePlayerBoard,
  rowIndex,
  columnIndex,
  onSquareBtnClick,
) {
  const squareBtn = document.createElement("button");
  squareBtn.classList.add("square");
  if (isActivePlayerBoard) {
    squareBtn.setAttribute("disabled", "");
    if (square && Object.prototype.hasOwnProperty.call(square, "isSunk")) {
      squareBtn.classList.add("ship");
    }
  } else {
    if (square !== "miss" && square !== "hit") {
      squareBtn.classList.add("cursor-pointer");
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

export function renderBoard(el, board, isActivePlayerBoard, onSquareBtnClick) {
  const boardDiv = document.createElement("div");
  boardDiv.classList.add("board");
  board.forEach((row, i) => {
    row.forEach((square, j) => {
      const squareBtn = createSquareBtn(
        square,
        isActivePlayerBoard,
        i,
        j,
        onSquareBtnClick,
      );
      boardDiv.append(squareBtn);
    });
  });
  el.append(boardDiv);
}

export function clearBoards(boardContainers, onSquareBtnClick) {
  boardContainers.forEach((boardContainer) => {
    const squareBtns = boardContainer.querySelectorAll(".square");
    squareBtns.forEach((squareBtn) => {
      squareBtn.removeEventListener("click", onSquareBtnClick);
    });
    boardContainer.innerHTML = "";
  });
}

export function disableBoard(boardContainer) {
  const squareBtns = boardContainer.querySelectorAll(".square");
  squareBtns.forEach((squareBtn) => {
    squareBtn.setAttribute("disabled", "");
  });
}
