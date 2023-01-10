const n = 3;
const start = document.querySelector(".start");
const gameBoard = (() => {
  let moveCount = 0;
  let board = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const checkEndGame = (i, player) => {
    if (i === n - 1) {
      // return winner
      const winnerBanner = document.querySelector(".winner-banner");
      const winnerMessage = document.querySelector(".winner-message");
      winnerBanner.classList.remove("hide");
      winnerMessage.innerText = `${player.name} wins!`;
      /*winnerBanner.appendChild(winnerMessage);*/
      console.log(player);
    }
  };
  const checkBoard = (x, y, player) => {
    const { symbol } = player;
    moveCount += 1;
    for (let i = 0; i < n; i++) {
      if (board[x][i] !== symbol) {
        break;
      }
      checkEndGame(i, player);
    }
    for (let i = 0; i < n; i++) {
      if (board[i][y] !== symbol) {
        break;
      }
      checkEndGame(i, player);
    }
    if (x === y) {
      for (let i = 0; i < n; i++) {
        if (board[i][i] !== symbol) {
          break;
        }
        checkEndGame(i, player);
      }
    }
    if (x + y === n - 1) {
      for (let i = 0; i < n; i++) {
        if (board[i][n - 1 - i] !== symbol) {
          break;
        }
        checkEndGame(i, player);
      }
    }
    if (moveCount === n * n) {
      // return draw
      console.log("draw");
    }
  };
  const set = (x, y, player) => {
    const { symbol } = player;
    if (board[x][y] === ".") {
      board[x][y] = symbol;
    }
    checkBoard(x, y, player);
    console.table(board);
  };
  const display = () => {
    console.log(board);
  };
  const resetBoard = () => {
    board = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ];
    moveCount = 0;
  };

  return { set, resetBoard };
})();

const player = (name, symbol) => ({ name, symbol });

const displayController = (() => {
  let turn = 0;
  const createSymbol = (item) => {
    const symbol = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    symbol.setAttribute("style", "width:100%;height:100%;");
    symbol.setAttribute("viewBox", "0 0 24 24");
    symbol.setAttribute("preserveAspectRatio", "xMaxYMax meet");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "#71717A");
    if (turn % 2 === 0) {
      // create X icon
      path.setAttribute(
        "d",
        "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
      );
    } else {
      // create O icon
      path.setAttribute(
        "d",
        "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      );
    }
    symbol.appendChild(path);
    item.appendChild(symbol);
  };
  const nextTurn = (item, player1, player2, x, y) => {
    if (turn % 2 === 0) {
      gameBoard.set(x, y, player1);
    } else {
      gameBoard.set(x, y, player2);
    }
    createSymbol(item);
    turn += 1;
  };
  const clear = () => {
    if (turn === 0) {
      return;
    }
    const allMarkers = document.querySelectorAll(".board-item");
    allMarkers.forEach((item) => {
      while (item.firstChild) {
        item.removeChild(item.firstChild);
        item.removeEventListener("click", incrementTurn);
      }
    });
  };
  const resetGame = () => {
    clear();
    turn = 0;
    gameBoard.resetBoard();
  };
  return { nextTurn, resetGame };
})();


function incrementTurn(item) {
  const id = parseInt(item.target.id, 10);
  const x = Math.floor(id / n);
  const y = id % n;
  displayController.nextTurn(item.target, item.target.player1, item.target.player2, x, y);
}
function boardItemsEvents() {
  const boardItems = document.querySelectorAll(".board-item");
  const player1 = player("Michael", "X");
  const player2 = player("Computer", "O");
  displayController.resetGame();
  boardItems.forEach((item) => {
    item.player1 = player1;
    item.player2 = player2;
    item.addEventListener("click", incrementTurn, { once: true });
  });
}
start.addEventListener("click", () => {
  boardItemsEvents();
});
