const gameBoard = (() => {
  board = [];

  return {
    board,
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
