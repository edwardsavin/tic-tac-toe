const gameBoard = (() => {
  let _board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const _winningConditions = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];

  const drawBoard = () => {
    const _boardFields = document.querySelectorAll(".field.active");

    // Add event listener and playerAction only on fields that are empty
    _boardFields.forEach((field) => {
      const _sendAction = () => {
        if (field.classList.contains("active")) {
          _playerAction(field);
        }
      };

      if (!field.textContent) {
        field.addEventListener("click", _sendAction, { once: true });
      }
    });
  };

  // Add "X" or "0" to the specific field, depending on what player has the control
  // Send the locations to _gameStatus
  const _playerAction = (field) => {
    if (player1.hasControl === "yes") {
      field.textContent = `${player1.mark}`;
      _changeBoard(field.getAttribute("data-index"), `${player1.mark}`);
      player1.positions.push(field.getAttribute("data-index"));
      _gameStatus(player1.name, player1.positions.sort());
      displayController.showControl(player2);
    } else {
      field.textContent = `${player2.mark}`;
      _changeBoard(field.getAttribute("data-index"), `${player2.mark}`);
      player2.positions.push(field.getAttribute("data-index"));
      _gameStatus(player2.name, player2.positions.sort());
      displayController.showControl(player1);
    }
  };

  // Change _board array with specific mark
  const _changeBoard = (index, mark) => {
    _board[index] = mark;
  };

  // Check if one of _winningConditions is met
  // Announce the winner
  const _gameStatus = (player, playerPositions) => {
    const matchStatus = document.querySelector(".match-status");
    const nextPlayer = document.querySelector(".next-player");

    // Filter and map the _winningConditions to check if one of them is equal to playerPositions
    Array.prototype.intersect = function (x) {
      return this.filter((e) => x.includes(e));
    };

    let mappedConditions = _winningConditions.map(
      (x) => x.intersect(playerPositions).length == x.length
    );

    let status = mappedConditions.some((e) => {
      return e === true;
    });

    if (status) {
      _removeActiveFields();
      nextPlayer.setAttribute("hidden", true);
      matchStatus.textContent = `${player} won!`;
      matchStatus.removeAttribute("hidden");
    } else if (playerPositions.length === 5) {
      nextPlayer.setAttribute("hidden", true);
      matchStatus.textContent = "It's a draw!";
      matchStatus.removeAttribute("hidden");
    } else if (player1.positions.length === 0) {
      matchStatus.setAttribute("hidden", true);
      nextPlayer.removeAttribute("hidden");
    }
  };

  const _removeActiveFields = () => {
    document.querySelectorAll(".field.active").forEach((element) => {
      element.classList.remove("active");
    });
  };

  // Start the game/ reset everything to the beginning of the game
  const restartGame = () => {
    _board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    player1.positions = [];
    player2.positions = [];

    // Delete event listeners from fields
    const _gameBoard = document.querySelector(".gameboard");
    const _inactiveFields = document.querySelectorAll(".field");
    _inactiveFields.forEach((field) => {
      _gameBoard.replaceChild(field.cloneNode(), field);
      field.classList.add("active");
    });

    const _restartButton = document.querySelector("#restart");
    _restartButton.textContent = "Restart";

    _gameStatus(player1.name, player1.positions.sort());
    displayController.showControl();
    drawBoard();
  };

  return {
    drawBoard,
    restartGame,
  };
})();

const playerFactory = (name, mark, type, hasControl, positions) => {
  return {
    name,
    mark,
    type,
    hasControl,
    positions,
  };
};

const player1 = playerFactory("Edward", "X", "human", "yes", []);
const player2 = playerFactory("Joe", "0", "human", "no", []);

// Switch control of players
const displayController = (() => {
  const showControl = (player = player1) => {
    const nextPlayer = document.querySelector(".next-player");
    if (player === player1) {
      player2.hasControl = "no";
      player1.hasControl = "yes";
    } else {
      player1.hasControl = "no";
      player2.hasControl = "yes";
    }

    nextPlayer.textContent = `${player.name} is choosing:`;
  };

  return {
    showControl,
  };
})();

function checkFields() {
  return document.querySelectorAll(".field.active");
}

gameBoard.drawBoard();
