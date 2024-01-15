import Ship from "./ship";

const squareAssignmentCheck = function checkIfSquareAlreadyHasShip(
  ships,
  squares
) {
  const assigned = [];

  ships.forEach((ship) => {
    assigned.push(...ship.squares);
  });

  squares.forEach((square) => {
    if (assigned.includes(square)) {
      throw new Error(
        "Invalid placement: One of the squares already has ship."
      );
    }
  });
};

const shipPositionCheck = function checkIfShipIsTooBigForPosition(
  squares,
  direction
) {
  if (direction === "x") {
    const commonLetter = squares[0][0];

    if (!squares.every((position) => position[0] === commonLetter)) {
      throw new Error(
        "Invalid placement: The ship is too big for the given coordinates."
      );
    }
  } else if (squares.includes(undefined)) {
    throw new Error(
      "Invalid placement: The ship is too big for the given coordinates."
    );
  }
};

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

export default function Gameboard() {
  const board = buildBoard();
  const ships = [];
  const hits = [];
  const misses = [];

  const getBoard = () => board;
  const getHits = () => hits;
  const getMisses = () => misses;

  const addShip = function placeShipAtCoordinates(
    shipClass,
    startPosition,
    direction
  ) {
    const ship = Ship(shipClass);
    const squares = [];

    const start = board.findIndex((position) => position === startPosition);

    if (direction === "x") {
      for (let i = start; i < start + ship.length(); i += 1) {
        squares.push(board[i]);
      }
    } else {
      for (let i = start; i < start + ship.length() * 10; i += 10) {
        squares.push(board[i]);
      }
    }

    // If any of the squares already have ships, throw an error.
    squareAssignmentCheck(ships, squares);

    // If any of the squares are too big for their position, throw an error.
    shipPositionCheck(squares, direction);

    const placementObject = { ship, squares };

    ships.push(placementObject);

    return placementObject;
  };

  const receiveAttack = function receiveAttackFromOpponent(position) {
    // Find the index of the ship that's been attacked.
    let attackedIndex = -1;

    ships.forEach((ship, index) => {
      if (ship.squares.includes(position)) attackedIndex = index;
    });

    // If a ship is attacked, call its hit() function or else increment the miss counter.
    if (attackedIndex === -1) {
      misses.push(position);
    } else {
      const attackedShip = ships[attackedIndex].ship;
      attackedShip.hit();
      hits.push(position);
    }
  };

  const shipsSunk = function checkIfAllShipsAreDestroyed() {
    let sinkStatus = true;
    ships.forEach((currentShip) => {
      if (!currentShip.ship.isSunk()) sinkStatus = false;
    });

    return sinkStatus;
  }

  return {
    getBoard,
    getHits,
    getMisses,
    addShip,
    receiveAttack,
    shipsSunk,
  };
}
