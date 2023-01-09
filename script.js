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
    for (let i = 0; i < n; i++) {
      if (board[x][i] !== symbol) {
        break;
      }
      if (i === n - 1) {
        //return winner
      }
    }
    for (let i = 0; i < n; i++) {
      if (board[i][y] !== symbol) {
        break;
      }
      if (i === n - 1) {
        //return winner
      }
    }
    if (x === y) {
      for (let i = 0; i < n; i++) {
        if (board[i][i] !== symbol) {
          break;
        }
        if (i === n - 1) {
          //return winner
        }
      }
    }
    if (x + y === n - 1) {
      for (let i = 0; i < n; i++) {
        if (board[i][n - 1 - i] !== symbol) {
          break;
        }
        if (i === n - 1) {
          //return winner
        }
      }
    }
  };
  const set = (x, y, symbol) => {
    if (board[x][y] === ".") {
      board[x][y] = symbol;
    }
    checkBoard();
  };
  const display = () => {
    console.log(board);
  };

  return { set, display };
})();

const player = (name, symbol) => ({ name, symbol });

const player1 = player("X");
const player2 = player("O");
