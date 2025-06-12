function createCar(name, health, attackStrength, defenseStrength) {
  return {
    name,
    health,
    attackStrength,
    defenseStrength,
    initialHealth: health,
  };
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function attack(attacker, defender) {
  const attackRoll = rollDice();
  const defenseRoll = rollDice();

  let attackDamage = attacker.attackStrength * attackRoll;
  let defensePower = defender.defenseStrength * defenseRoll;

  switch (attackRoll) {
    case 1:
      attackDamage = 0;
    case 6:
      attackDamage = attacker.attackStrength * -1.5;
    default:
      attackDamage = attacker.attackStrength * attackRoll;
  }
  const netDamage = Math.max(0, attackDamage - defensePower);

  defender.health = Math.max(0, defender.health - netDamage);

  return {
    attackRoll,
    defenseRoll,
    attackDamage,
    defensePower,
    netDamage,
    defenderHealthAfter: defender.health,
  };
}

function isDestroyed(car) {
  return car.health <= 0;
}

module.exports = {
  createCar,
  attack,
  isDestroyed,
  rollDice,
};
