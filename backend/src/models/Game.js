const carModel = require("./Car");
function createGame(car1, car2, car3) {
  return {
    car1,
    car2,
    car3,
    currentTurn: car1.health <= car2.health ? car1 : car2,
    gameOver: false,
    winner: null,
    turnHistory: [],
  };
}

function getGameStatus(game) {
  return {
    car1: {
      name: game.car1.name,
      health: game.car1.health,
      initialHealth: game.car1.initialHealth,
      attackStrength: game.car1.attackStrength,
      defenseStrength: game.car1.defenseStrength,
    },
    car2: {
      name: game.car2.name,
      health: game.car2.health,
      initialHealth: game.car2.initialHealth,
      attackStrength: game.car2.attackStrength,
      defenseStrength: game.car2.defenseStrength,
    },
    currentTurn: game.currentTurn.name,
    gameOver: game.gameOver,
    winner: game.winner ? game.winner.name : null,
    turnHistory: game.turnHistory,
  };
}

function executeTurn(game) {
  if (game.gameOver) {
    throw new Error("Game is already over");
  }

  const attacker = game.currentTurn;
  const defender = attacker === game.car1 ? game.car2 : game.car1;

  const turnResult = carModel.attack(attacker, defender);

  game.turnHistory.push({
    attacker: attacker.name,
    defender: defender.name,
    ...turnResult,
  });

  if (carModel.isDestroyed(defender)) {
    game.gameOver = true;
    game.winner = attacker;
  } else {
    game.currentTurn = defender;
  }

  return {
    turnResult,
    gameStatus: getGameStatus(game),
  };
}

module.exports = {
  createGame,
  executeTurn,
  getGameStatus,
};
