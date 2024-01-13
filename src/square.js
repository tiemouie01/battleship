export default function Square(position) {
  let ship = null;

  const addShip = function addAShipReferenceToTheSquare(name) {
    ship = name;
  };

  const getPosition = () => position;
  const getShip = () => ship;

  return {
    addShip,
    getPosition,
    getShip,
  };
}
