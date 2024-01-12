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
  }
  return {
    getName,
    length,
  };
}

module.exports = Ship;
