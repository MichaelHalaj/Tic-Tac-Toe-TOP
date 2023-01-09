const gameBoard = (function () {
  let board = [['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.']];
  const set = (x, y, symbol) => {
    board[x][y] = symbol;
  };
  const display = () => {
    console.log(board);
  };
  return { set, display };
}());

const player = (symbol) => ({ symbol });

const player1 = player('X');
const player2 = player('O');

