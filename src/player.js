import Gameboard from "./gameboard";

const generateDirection = function generateRandomDirectionValue() {
  return Math.floor(Math.random() * 2) === 0 ? "x" : "y";
};

const addShipRandomly = function addSpecificShipToGameboardRandomly(board, name) {
  // Add ships separately but randomise their coordinates using the board.
  const gameboard = board.getBoard();
  let index = Math.floor(Math.random() * 100);
  let position = gameboard[index];
  let direction = generateDirection();

  // Use a try-catch block to insert the named ship onto the board.
  let successful = false;

  while (!successful) {
    try {
      board.addShip(name, position, direction);
      successful = true;
    } catch {
      index = Math.floor(Math.random() * 100);
      position = gameboard[index];
      direction = generateDirection();
    }
  }
};

export default function Player(name = null) {
  const board = Gameboard();

  // If the name of a player is not specified. Randomly assign ships onto the board.
  if (!name) {
    addShipRandomly(board, "Carrier");
    addShipRandomly(board, "Battleship");
    addShipRandomly(board, "Destroyer");
    addShipRandomly(board, "Submarine");
    addShipRandomly(board, "Patrol Boat");
  }

  const getName = () => {
    if (!name) return "Computer";
    return name;
  };

  const attack = function attackEnemyFleet(player, position = null) {
    player.board.receiveAttack(position);
  };

  return {
    board,
    getName,
    attack,
  };
}
