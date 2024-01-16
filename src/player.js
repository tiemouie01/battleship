import Gameboard from "./gameboard";

export default function Player(name = null) {
  const board = Gameboard();

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
