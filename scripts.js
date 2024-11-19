const Gameboard = (function() {
  let table = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8",
  ];

  const getTable = () => table;

  const setPosition = (token, position) => {    
    if (table[position] === "X" || table[position] === "O") {
      console.log("Error, this position is already used");
      return;
    } else {      
      table.splice(position, 1, token);
    }
  }

  return { getTable, setPosition };
})();


function GameController(
  playerOneName = "Player 1",
  playerTwoName = "Player 2"
) {

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

  let turns = 1;
  const addTurn = () => turns++;

  let finishGame = false;
  const setEndGame = () => (finishGame = true);

  let activePlayer = players[0];
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    addTurn();
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
      Display.winner(player);
    }
  };

  const checkTie = () => {
    if (turns === 10) {
      setEndGame();
      Display.tie();
    }
  }

  const playRound = (position) => {
    Gameboard.setPosition(getActivePlayer().token, position);
    
    checkWinner(getActivePlayer().name);

    if (finishGame) {
      return;
    } else {
      switchPlayerTurn();
      Display.newRound(getActivePlayer().name);
    }

    checkTie();
  };

  Display.newRound(getActivePlayer().name);

  return { playRound, getActivePlayer };
}


const Display = (function() {
  const btn = document.querySelectorAll(".btn");
  const turn = document.querySelector(".turn");

  const newRound = (activePlayer) => {
    turn.textContent = `${activePlayer}'s turn.`;
  }

  const winner = (activePlayer) => {
    turn.textContent = `${activePlayer} wins!`;
    btn.forEach((button) => button.setAttribute("disabled", true));
  }

  const tie = () => {
    turn.textContent = "It's a tie!";
    btn.forEach((button) => button.setAttribute("disabled", true));
  }

  btn.forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = `${game.getActivePlayer().token}`;
      button.toggleAttribute("disabled");
      game.playRound(button.id);
    });
  });

  return { newRound, winner, tie };
})();

const game = GameController();
