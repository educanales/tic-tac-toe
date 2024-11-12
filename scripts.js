const user = "x";
const com = "o";

function gameBoard() {
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

const play = gameBoard();

play.setPosition(user, 0);
play.setPosition(com, 8);
console.log(play.getTable());
