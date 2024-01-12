/* eslint-disable import/extensions */
/* eslint-disable no-undef */
const Ship = require("./ship.js");

test("Carrier has a length of 5", () => {
  const testShip = Ship("Carrier");

  expect(testShip.length()).toBe(5);
});

test("Battleship has a length of 4", () => {
  const testShip = Ship("Battleship");

  expect(testShip.length()).toBe(4);
});

test("Destroyer has a length of 3", () => {
  const testShip = Ship("Destroyer");

  expect(testShip.length()).toBe(3);
});

test("Submarine has a length of 3", () => {
  const testShip = Ship("Submarine");

  expect(testShip.length()).toBe(3);
});

test("Patrol Boat has a length of 2", () => {
  const testShip = Ship("Patrol Boat");

  expect(testShip.length()).toBe(2);
});

test("Increment the number of hits", () => {
  const ship = Ship("Destroyer");
  ship.hit();

  expect(ship.getHits()).toBe(1);
});

test("Hit the ship twice", () => {
  const ship = Ship("Destroyer");
  ship.hit();
  ship.hit();

  expect(ship.getHits()).toBe(2);
});

test("Stop incrementing hits when the hits equal the length of the ship", () => {
  const ship = Ship("Patrol Boat");
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.getHits()).toBe(2);
});

test("Return true if the ship is sunk", () => {
  const ship = Ship("Submarine");
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});

test("Return false if the ship is not sunk", () => {
  const ship = Ship("Carrier");
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(false);
});
