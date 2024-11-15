function Gameboard() {
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
}


function GameController(playerOneName = "User", playerTwoName = "COM") {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: "X"
    },
    {
      name: playerTwoName,
      token: "O"
    }
  ];

  let finishGame = false;

  const setEndGame = () => finishGame = true;

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const checkWinner = (player) => {
    if (
      board.getTable()[0] === board.getTable()[1] && board.getTable()[1] === board.getTable()[2] ||
      board.getTable()[0] === board.getTable()[3] && board.getTable()[3] === board.getTable()[6] ||
      board.getTable()[0] === board.getTable()[4] && board.getTable()[4] === board.getTable()[8] ||
      board.getTable()[1] === board.getTable()[4] && board.getTable()[4] === board.getTable()[7] ||
      board.getTable()[2] === board.getTable()[5] && board.getTable()[5] === board.getTable()[8] ||
      board.getTable()[3] === board.getTable()[4] && board.getTable()[4] === board.getTable()[5] ||
      board.getTable()[6] === board.getTable()[7] && board.getTable()[7] === board.getTable()[8] ||
      board.getTable()[6] === board.getTable()[4] && board.getTable()[4] === board.getTable()[2]
    ) {
      setEndGame();
      console.log(`${player} wins`);
    }
  }

  const printNewRound = () => {
    board.printTable();    
    console.log(`${getActivePlayer().name}'s turn.`);
  }

  const playRound = (position) => {
    console.log(`${getActivePlayer().name} has selected position ${position}`);
    board.setPosition(getActivePlayer().token, position);

    checkWinner(getActivePlayer().name);
    if (finishGame) {
      return;
    } else {
        switchPlayerTurn();
        printNewRound();
      }    
  }

  printNewRound();

  return { playRound, getActivePlayer };
}

const game = GameController("Edu");

// game.playRound(0)
