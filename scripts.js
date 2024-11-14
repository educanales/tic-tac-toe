function Gameboard() {
  let table = [
    "", "", "", // 0, 1, 2,
    "", "", "", // 3, 4, 5,
    "", "", "", // 6, 7, 8,
  ]

  const getTable = () => table;

  const setPosition = (player, position) => {
    table.splice(position, 1, player)
  }

  return { getTable, setPosition };
}

function GameController(playerOneName = "User", playerTwoName = "COM") {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      value: "X"
    },
    {
      name: playerTwoName,
      value: "O"
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.getTable();
    console.log(board.getTable())
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (position) => {
    console.log(`${getActivePlayer().name} has selected position ${position}`);
    board.setPosition(getActivePlayer().value, position);

    switchPlayerTurn();
    printNewRound();
  }

  printNewRound();

  return { playRound, getActivePlayer };
}

const game = GameController();

game.playRound(0)


/*
if (
  table[0] === table[1] && table[1] === table[2] ||
  table[0] === table[3] && table[3] === table[6] ||
  table[0] === table[4] && table[4] === table[8] ||
  table[1] === table[4] && table[4] === table[7] ||
  table[2] === table[5] && table[5] === table[8] ||
  table[3] === table[4] && table[4] === table[5] ||
  table[6] === table[7] && table[7] === table[8] ||
  table[6] === table[4] && table[4] === table[2]
) {
  
}
*/