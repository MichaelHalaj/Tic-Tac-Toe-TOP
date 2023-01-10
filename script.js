const boardItems = document.querySelectorAll(".board-item");
const n = 3;
const gameBoard = (() => {
  let moveCount = 0;
  let board = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const checkBoard = (x, y, symbol) => {
    moveCount += 1;
    for (let i = 0; i < n; i++) {
      if (board[x][i] !== symbol) {
        break;
      }
      if (i === n - 1) {
        // return winner
        console.log(symbol);
      }
    }
    for (let i = 0; i < n; i++) {
      if (board[i][y] !== symbol) {
        break;
      }
      if (i === n - 1) {
        // return winner
        console.log(symbol);
      }
    }
    if (x === y) {
      for (let i = 0; i < n; i++) {
        if (board[i][i] !== symbol) {
          break;
        }
        if (i === n - 1) {
          // return winner
          console.log(symbol);
        }
      }
    }
    if (x + y === n - 1) {
      for (let i = 0; i < n; i++) {
        if (board[i][n - 1 - i] !== symbol) {
          break;
        }
        if (i === n - 1) {
          // return winner
          console.log(symbol);
        }
      }
    }
    if (moveCount === n * n) {
      // return draw
      console.log("draw");
    }
  };
  const set = (x, y, symbol) => {
    if (board[x][y] === ".") {
      board[x][y] = symbol;
    }
    checkBoard(x, y, symbol);
    console.table(board);
  };
  const display = () => {
    console.log(board);
  };

  return { set, display };
})();

const player = (name, symbol) => ({ name, symbol });

const displayController = (() => {
  let turn = 0;
  const createSymbol = (item) => {
    const symbol = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    symbol.setAttribute("style", "width:24px;height:24px");
    symbol.setAttribute("viewBox", "0 0 24 24");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    if (turn % 2 === 0) {
      // create X icon
      path.setAttribute("fill", "currentColor");
      path.setAttribute(
        "d",
        "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
      );
    } else {
      // create O icon
      path.setAttribute("fill", "currentColor");
      path.setAttribute(
        "d",
        "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      );
    }
    symbol.appendChild(path);
    item.appendChild(symbol);
  };
  const nextTurn = (item, id, x, y) => {
    if (turn % 2 === 0) {
      gameBoard.set(x, y, "X");
    } else {
      gameBoard.set(x, y, "O");
    }
    createSymbol(item);
    turn += 1;
  };
  return { nextTurn };
})();
const player1 = player("Michael", "X");
const player2 = player("Computer", "O");

boardItems.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item.id);
    const id = parseInt(item.id, 10);
    const x = Math.floor(id / n);
    const y = id % n;
    displayController.nextTurn(item, id, x, y);
  }, { once: true });
});
