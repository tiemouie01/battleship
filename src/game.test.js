/* eslint-disable no-undef */
import Game from "./game";

test("Create a new game with players and boards", () => {
  const game = Game("Player One", "Player Two");
  const playerOne = game.getActivePlayer();
  const playerTwo = game.getInactivePlayer();

  expect(playerOne.getName()).toBe("Player One");
  expect(playerTwo.getName()).toBe("Player Two");
  expect(playerOne).toHaveProperty("board");
  expect(playerTwo).toHaveProperty("board");
});

test("Create a new game with a player against computer", () => {
  const game = Game("Player One");
  const playerOne = game.getActivePlayer();
  const computer = game.getInactivePlayer();

  expect(playerOne.getName()).toBe("Player One");
  expect(computer.getName()).toBe("Computer");
  expect(playerOne).toHaveProperty("board");
  expect(computer).toHaveProperty("board");
});

test("Test game switching functionality", () => {
  const game = Game("Player One", "Player Two");
  
  const playerTwo = game.getInactivePlayer();
  playerTwo.board.addShip("Carrier", "A1", "x");
  playerTwo.board.addShip("Battleship", "B1", "y");
  playerTwo.board.addShip("Destroyer", "D5", "x");
  playerTwo.board.addShip("Submarine", "F1", "y");
  playerTwo.board.addShip("Patrol Boat", "G3");
  
  expect(game.getActivePlayer().getName()).toBe("Player One");

  game.attackShip("F6");

  expect(game.getActivePlayer().getName()).toBe("Player Two");
});

test("Test game ending logic", () => {
  const game = Game("Player One", "PlayerTwo");
  const playerOne = game.getActivePlayer();
  const playerTwo = game.getInactivePlayer();

  playerOne.board.addShip("Submarine", "A1", "x");
  playerTwo.board.addShip("Patrol Boat", "A1", "y");

  expect(game.gameOver()).toBeFalsy();

  game.attackShip("A1");
  game.attackShip("A2");
  game.attackShip("B1");

  expect(game.gameOver()).toBe("Player One");
})