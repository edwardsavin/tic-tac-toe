const gameBoard = (() => {
  const _board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const drawBoard = () => {
    let index = -1;

    _board.forEach(() => {
      index += 1;
      document.querySelector(
        `[data-index="${index}"]`
      ).textContent = `${_board[index]}`;
    });
  };

  return {
    drawBoard,
  };
})();

const playerFactory = (name, mark, type, hasControl) => {
  return {
    name,
    mark,
    type,
    hasControl,
  };
};

const player1 = playerFactory("Edward", "X", "human", "no");
const player2 = playerFactory("Joe", "0", "human", "no");

const displayController = (() => {
  const showControl = (player) => {
    if (player === player1) {
      player2.hasControl = "no";
      player1.hasControl = "yes";
    } else {
      player1.hasControl = "no";
      player2.hasControl = "yes";
    }
  };

  return {
    showControl,
  };
})();
