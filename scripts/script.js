const gameBoard = (() => {
  const _board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const drawBoard = () => {
    const _boardFields = document.querySelectorAll(".field");

    // Add event listener and playerAction only on fields that are empty
    _boardFields.forEach((field) => {
      if (!field.textContent) {
        field.addEventListener(
          "click",
          () => {
            _playerAction(field);
          },
          { once: true }
        );
      }
    });
  };

  // Add "X" or "0" to the specific field, depending on what player has the control
  const _playerAction = (field) => {
    if (player1.hasControl === "yes") {
      field.textContent = `${player1.mark}`;
      _changeBoard(field.getAttribute("data-index"), `${player1.mark}`);
      displayController.showControl(player2);
    } else {
      field.textContent = `${player2.mark}`;
      _changeBoard(field.getAttribute("data-index"), `${player2.mark}`);
      displayController.showControl(player1);
    }
  };

  // Change _board array with specific mark
  const _changeBoard = (index, mark) => {
    console.table(_board);
    _board[index] = mark;
    console.table(_board);
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

const player1 = playerFactory("Edward", "X", "human", "yes");
const player2 = playerFactory("Joe", "0", "human", "no");

// Switch control of players
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

gameBoard.drawBoard();
