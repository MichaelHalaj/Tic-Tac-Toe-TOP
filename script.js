const gameBoard = (() => {
  const n = 3;
  let moveCount = 0;
  let board = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const drawBoard = () => {};
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
    if (moveCount === n * n - 1) {
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

const displayController = (x, y) => {
  let turn = 0;
  const nextTurn = () => {
    if (turn % 2 === 0) {
      gameBoard.set(x, y, "X");
    } else {
      gameBoard.set(x, y, "O");
    }
    turn += 1;
  };
  return { nextTurn };
};
const player1 = player("Michael", "X");
const player2 = player("Computer", "O");
