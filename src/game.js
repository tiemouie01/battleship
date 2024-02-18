import Player from "./player";

export default function Game(playerOneName, playerTwoName = null) {
  const players = [Player(playerOneName), Player(playerTwoName)];

  let activePlayer = players[0];
  let inactivePlayer = players[1];

  const switchPlayerTurn = () => {
    if (activePlayer === players[0]) {
      [inactivePlayer, activePlayer] = players;
    } else {
      [activePlayer, inactivePlayer] = players;
    }
  };

  const getActivePlayer = () => activePlayer;
  const getInactivePlayer = () => inactivePlayer;

  const attackShip = (position) => {
    activePlayer.attack(inactivePlayer, position);
    switchPlayerTurn();
  };

  const gameOver = function checkIfOneTheFleetsSunk() {
    if (getActivePlayer().board.shipsSunk()) {
      return getInactivePlayer().getName();
    }
    return false;
  };
  return {
    getActivePlayer,
    getInactivePlayer,
    attackShip,
    gameOver,
  };
}
