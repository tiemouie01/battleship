import Ship from "./ship";

const buildBoard = function buildTheGameboard() {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const grid = [];

  for (let i = 0; i < 10; i += 1) {
    const position = letters[i];

    for (let j = 0; j < 10; j += 1) {
      const number = j + 1;
      grid.push(position + number);
    }
  }

  return grid;
};

function Gameboard() {
  const board = buildBoard();
  // const ships = [];

  const getBoard = () => board;

  // const addShip = function placeShipAtCoordinates(
  //   shipClass,
  //   startPosition,
  //   direction
  // ) {
  //   const ship = Ship(shipClass);
  //   const squares = [];

  //   const start = board.findIndex((position) => position === startPosition);

  //   if (direction === "x") {
  //     for (let i = start; i < start + ship.length(); i += 1) {
  //       squares.push(board[i]);
  //     }
  //   } else {
  //     for (let i = start; i < start + ship.length() * 10; i += 10) {
  //       squares.push(board[i]);
  //     }
  //   }

  //   const placementObject = { ship, squares };

  //   ships.push(placementObject);

  //   return placementObject;
  // };

  return {
    getBoard,
    // addShip,
  };
}

module.exports = Gameboard;
