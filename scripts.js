const Gameboard = (function() {
  let table = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8",
  ];

  const getTable = () => table;

  const setPosition = (token, position) => {    
    table.splice(position, 1, token);    
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
      score: 0,
    },
    {
      name: playerTwoName,
      token: "O",
      score: 0,
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
      Display.winner(player.name);
      updateScore(player);
      Display.score(players[0], players[1]);
    }
  };

  const updateScore = (winner) => {
    players.map((player) => {
      if (player.name === winner.name) {
        return { ...player, score: winner.score++ };
      } else {
        return player;
      }      
    })
  }

  const checkTie = () => {
    if (turns === 10) {
      setEndGame();
      Display.tie();
    }
  }

  const playRound = (position) => {    
    Gameboard.setPosition(getActivePlayer().token, position);
    
    checkWinner(getActivePlayer());

    if (finishGame) {
      return;
    } else {
      switchPlayerTurn();
      Display.newRound(getActivePlayer().name);
    }

    checkTie();
  };

  const reset = () => {
    for (let i = 0; i <= Gameboard.getTable().length - 1; i++) {
      Gameboard.setPosition(i, i);
    }
    turns = 1;
    finishGame = false;
    activePlayer = players[0];
    Display.newRound(getActivePlayer().name);
  }

  Display.newRound(getActivePlayer().name);
  Display.score(players[0], players[1]);

  return { playRound, getActivePlayer, reset };
}


const Display = (function() {
  const btn = document.querySelectorAll(".btn");
  const turn = document.querySelector(".turn");
  const resetBtn = document.querySelector(".reset-btn");
  const playerOneName = document.querySelector(".player1-name");
  const playerTwoName = document.querySelector(".player2-name");
  const playerOneScore = document.querySelector(".player1-score");
  const playerTwoScore = document.querySelector(".player2-score");

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

  const score = (player1, player2) => {
    playerOneName.textContent = `${player1.name}`;
    playerOneScore.textContent = `${player1.score}`;
    playerTwoName.textContent = `${player2.name}`;
    playerTwoScore.textContent = `${player2.score}`;
  }

  resetBtn.addEventListener("click", () => {
    game.reset();
    btn.forEach((button) => {
      button.textContent = "";
      button.removeAttribute("disabled");
    });
  });

  btn.forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = `${game.getActivePlayer().token}`;
      button.toggleAttribute("disabled");
      game.playRound(button.id);
    });
  });

  return { newRound, winner, tie, score };
})();

const game = GameController();
