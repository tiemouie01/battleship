/* eslint-disable no-undef */
import Player from "./player";

// General tests
test("Each player has a gameboard", () => {
  const playerOne = Player("Player One");

  expect(playerOne).toHaveProperty("board");
});

test("Hit ship on enemy gameboard", () => {
  const playerOne = Player("Player One");
  playerOne.board.addShip("Carrier", "A3", "y");

  const playerTwo = Player("Player Two");

  playerTwo.attack(playerOne, "C3");
  expect(playerOne.board.getHits()).toStrictEqual(["C3"]);
  expect(playerOne.board.getMisses()).toStrictEqual([]);
});

test("Miss ship on enemy gameboard", () => {
  const playerOne = Player("Player One");
  playerOne.board.addShip("Carrier", "A3", "y");

  const playerTwo = Player("Player Two");

  playerTwo.attack(playerOne, "G6");
  expect(playerOne.board.getHits()).toStrictEqual([]);
  expect(playerOne.board.getMisses()).toStrictEqual(["G6"]);
});

// Computer tests

test("Computer adds 5 ships to its gameboard", () => {
  const computer = Player();
  const ships = computer.board.getShips();

  expect(ships.length).toBe(5);
});

test("Computer has one of each ship on its gameboard", () => {
  const ships = Player().board.getShips();

  const shipNames = [];
  ships.forEach((currentShip) => {
    shipNames.push(currentShip.ship.getName());
  });

  expect(shipNames.includes("Carrier")).toBeTruthy();
  expect(shipNames.includes("Battleship")).toBeTruthy();
  expect(shipNames.includes("Destroyer")).toBeTruthy();
  expect(shipNames.includes("Submarine")).toBeTruthy();
  expect(shipNames.includes("Patrol Boat")).toBeTruthy();
});

test("Computer can execute random attack", () => {
  const playerOne = Player("Player One");

  const computer = Player();

  computer.attack(playerOne);
  expect(playerOne.board.getMisses().length > 0).toBeTruthy();
});

test("Computer should not shoot the same coordinate twice", () => {
  const playerOne = Player("Player One");
  playerOne.board.addShip("Carrier", "A3", "y");

  const computer = Player();

  computer.attack(playerOne, "C3");
  expect(() => computer.attack(playerOne, "C3")).toThrow(
    "Attack Error: Square has already been attacked."
  );
});
