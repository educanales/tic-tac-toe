const Gameboard = (function() {
  let table = [
    "0", "1", "2", // 0, 1, 2,
    "3", "4", "5", // 3, 4, 5,
    "6", "7", "8", // 6, 7, 8,
  ];

  const getTable = () => table;

  const printTable = () => console.log(table);

  const setPosition = (token, position) => {    
    if (table[position] === "X" || table[position] === "O") {
      console.log("Error, this position is already used");
      return;
    } else {      
      table.splice(position, 1, token);
    }
  }  

  return { getTable, printTable, setPosition };
})();


function GameController(
  playerOneName = "Player 1",
  playerTwoName = "Player 2"
) {
  // const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let finishGame = false;

  const setEndGame = () => (finishGame = true);

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const checkWinner = (player) => {
    if (
      (Gameboard.getTable()[0] === Gameboard.getTable()[1] &&
        Gameboard.getTable()[1] === Gameboard.getTable()[2]) ||
      (Gameboard.getTable()[0] === Gameboard.getTable()[3] &&
        Gameboard.getTable()[3] === Gameboard.getTable()[6]) ||
      (Gameboard.getTable()[0] === Gameboard.getTable()[4] &&
        Gameboard.getTable()[4] === Gameboard.getTable()[8]) ||
      (Gameboard.getTable()[1] === Gameboard.getTable()[4] &&
        Gameboard.getTable()[4] === Gameboard.getTable()[7]) ||
      (Gameboard.getTable()[2] === Gameboard.getTable()[5] &&
        Gameboard.getTable()[5] === Gameboard.getTable()[8]) ||
      (Gameboard.getTable()[3] === Gameboard.getTable()[4] &&
        Gameboard.getTable()[4] === Gameboard.getTable()[5]) ||
      (Gameboard.getTable()[6] === Gameboard.getTable()[7] &&
        Gameboard.getTable()[7] === Gameboard.getTable()[8]) ||
      (Gameboard.getTable()[6] === Gameboard.getTable()[4] &&
        Gameboard.getTable()[4] === Gameboard.getTable()[2])
    ) {
      setEndGame();
      Display.winner(getActivePlayer().name);
      console.log(`${player} wins`);
    }
  };

  // const printNewRound = () => {
  //   Gameboard.printTable();
  //   console.log(`${getActivePlayer().name}'s turn.`);
  // };

  const playRound = (position) => {
    // console.log(`${getActivePlayer().name} has selected position ${position}`);
    if (
      Gameboard.getTable()[position] === "X" || 
      Gameboard.getTable()[position] === "O"
    ) {
      console.log("error");
      return
      } else {
        Gameboard.setPosition(getActivePlayer().token, position);
        // switchPlayerTurn();
      }

    checkWinner(getActivePlayer().name);
    if (finishGame) {
      return;
    } else {
      switchPlayerTurn();
      // printNewRound();
      Display.newRound(getActivePlayer().name);
    }
  };

  Display.newRound(getActivePlayer().name);
  // printNewRound();
  // Display();

  return { playRound, getActivePlayer };
}

const Display = (function() {
  const btn = document.querySelectorAll(".btn");
  const turn = document.querySelector(".turn");

  const newRound = (activePlayer) => {
    turn.textContent = `${activePlayer}'s turn.`;
  }

  const winner = (activePlayer) => {
    turn.textContent = `${activePlayer} wins.`;
    btn.forEach((button) => button.setAttribute("disabled", true));
  }

  btn.forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = `${game.getActivePlayer().token}`;
      button.toggleAttribute("disabled");
      game.playRound(button.id);
    });
  });

  return { newRound, winner };
})();

const game = GameController();

// game.playRound(0)
