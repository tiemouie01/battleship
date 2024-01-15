/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import Gameboard from "./gameboard";
// const Gameboard = require("./gameboard.js");


test("Accurate coordinates on the gameboard", () => {
  const board = Gameboard();

  expect(board.getBoard()).toStrictEqual([
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
    "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
    "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
    "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10",
    "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10",
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
    "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10",
    "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10",
    "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10",
    "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10",
  ]);
});

test("Place ship on gameboard horizontally", () => {
  const board = Gameboard();
  const placementObject = board.addShip("Battleship", "A1", "x");

  expect(placementObject).toHaveProperty("ship");
  expect(placementObject.squares).toStrictEqual(["A1", "A2", "A3", "A4",]);
});

test("Place ship on gameboard vertically", () => {
  const board = Gameboard();
  const placementObject = board.addShip("Battleship", "A1", "y");

  expect(placementObject).toHaveProperty("ship");
  expect(placementObject.squares).toStrictEqual(["A1", "B1", "C1", "D1",]);
});

//  Error tests.
test("Throw error if square already has ship", () => {
  const board = Gameboard();
  board.addShip("Destroyer", "A1", "x");

  expect(() => board.addShip("Carrier", "A2", "y")).toThrow(
    "Invalid placement: One of the squares already has ship."
  );
});

test("Throw error if ship is too big for coordinates: Part 1", () => {
  const board = Gameboard();
  
  expect(() => board.addShip("Battleship", "H9", "x")).toThrow(
    "Invalid placement: The ship is too big for the given coordinates."
  );
});

test("Throw error if ship is too big for coordinates, Part 2", () => {
  const board = Gameboard();
  
  expect(() => board.addShip("Battleship", "I8", "y")).toThrow(
    "Invalid placement: The ship is too big for the given coordinates."
  );
});

test("Hit a ship on the gameboard", () => {
  const board = Gameboard();
  board.addShip("Submarine", "C2", "x");
  board.receiveAttack("C4");

  expect(board.getHits()).toStrictEqual(["C4"]);
  expect(board.ships[0].ship.getHits()).toBe(1);
});

test("Miss a ship on the gameboard", () => {
  const board = Gameboard();
  board.addShip("Submarine", "C2", "x");
  board.receiveAttack("D4");
  board.receiveAttack("E5");

  expect(board.ships[0].ship.getHits()).toBe(0);
  expect(board.getMisses()).toStrictEqual(["D4", "E5"]);
});

test("Check if all ships have been sunk", () => {
  const board = Gameboard();
  board.addShip("Submarine", "B9", "y");
  board.addShip("Patrol Boat", "J5", "x");

  board.receiveAttack("B9");
  board.receiveAttack("C9");
  board.receiveAttack("D9");
  board.receiveAttack("J5");
  board.receiveAttack("J6");

  expect(board.shipsSunk()).toBe(true);
});

test("Check if some ships are afloat", () => {
  const board = Gameboard();
  board.addShip("Submarine", "B9", "y");
  board.addShip("Patrol Boat", "J5", "x");

  board.receiveAttack("B9");
  board.receiveAttack("C9");
  board.receiveAttack("D9");
  board.receiveAttack("J5");

  expect(board.shipsSunk()).toBe(false);
});