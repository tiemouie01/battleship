function Ship(name) {
  const getName = () => name;

  const length = function lengthOfShip() {
    let size;

    if (name === "Carrier") size = 5;
    else if (name === "Battleship") size = 4;
    else if (name === "Destroyer") size = 3;
    else if (name === "Submarine") size = 3;
    else if (name === "Patrol Boat") size = 2;

    return size;
  };

  let hits = 0;

  const getHits = () => hits;

  const hit = function incrementHits() {
    if (hits < length()) hits += 1;
  };

  return {
    getName,
    length,
    getHits,
    hit,
  };
}

module.exports = Ship;
