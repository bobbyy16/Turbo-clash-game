import { useState } from "react";
import { Dice1, Heart, Shield, Swords } from "lucide-react";

const TurboClashDerby = () => {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [diceRolling, setDiceRolling] = useState(false);

  const startGame = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/game/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car1: {
            name: "Thunderbolt",
            health: 50,
            attackStrength: 10,
            defenseStrength: 5,
          },
          car2: {
            name: "Iron Crusher",
            health: 100,
            attackStrength: 5,
            defenseStrength: 10,
          },
        }),
      });
      const data = await response.json();
      setGameState(data);
    } catch (err) {
      setError("Failed to start game");
    } finally {
      setLoading(false);
    }
  };

  const executeTurn = async () => {
    try {
      setLoading(true);
      setDiceRolling(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch("http://localhost:3001/api/game/turn", {
        method: "POST",
      });
      const data = await response.json();
      setGameState(data.gameStatus);

      setTimeout(() => {
        setDiceRolling(false);
      }, 500);
    } catch (err) {
      setError("Failed to execute turn");
    } finally {
      setLoading(false);
    }
  };

  const HealthBar = ({ current, max }) => (
    <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ${
          current < max * 0.3
            ? "bg-red-500"
            : current < max * 0.7
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
        style={{ width: `${(current / max) * 100}%` }}
      />
    </div>
  );

  const CarStats = ({ car }) => (
    <div className="p-4 bg-white rounded border border-gray-200">
      <h3 className="text-xl font-bold mb-3 text-gray-800">{car.name}</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500" size={20} />
          <HealthBar current={car.health} max={car.initialHealth} />
        </div>
        <div className="flex items-center gap-2">
          <Swords className="text-blue-500" size={20} />
          <span className="bg-blue-50 px-2 py-1 rounded">
            Attack: {car.attackStrength}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="text-green-500" size={20} />
          <span className="bg-green-50 px-2 py-1 rounded">
            Defense: {car.defenseStrength}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto bg-white rounded p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Turbo Clash Derby
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>
        )}

        {!gameState ? (
          <button
            onClick={startGame}
            disabled={loading}
            className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded
              hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            Start New Game
          </button>
        ) : (
          <>
            <div className="flex justify-between items-center gap-4 mb-6">
              <CarStats car={gameState.car1} />
              <div className="flex flex-col items-center">
                {diceRolling && (
                  <Dice1 size={32} className="text-gray-600 animate-spin" />
                )}
              </div>
              <CarStats car={gameState.car2} />
            </div>

            {!gameState.gameOver ? (
              <div className="text-center space-y-4">
                <div className="inline-block px-4 py-2 bg-purple-50 rounded text-purple-700 font-medium">
                  Current Turn: {gameState.currentTurn}
                </div>
                <div>
                  <button
                    onClick={executeTurn}
                    disabled={loading || diceRolling}
                    className="py-2 px-6 bg-green-500 text-white font-semibold rounded
                      hover:bg-green-600 disabled:opacity-50 transition-colors"
                  >
                    {diceRolling ? "Rolling..." : "Roll Dice & Attack"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-yellow-50 rounded border border-yellow-200">
                <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
                <p className="text-lg mb-4">Winner: {gameState.winner}</p>
                <button
                  onClick={startGame}
                  className="py-2 px-4 bg-blue-500 text-white font-semibold rounded
                    hover:bg-blue-600 transition-colors"
                >
                  Play Again
                </button>
              </div>
            )}

            {gameState.turnHistory.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Battle Log</h3>
                <div className="space-y-2">
                  {gameState.turnHistory.map((turn, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded border border-gray-200"
                    >
                      <p className="text-sm">
                        <span className="font-medium text-purple-600">
                          {turn.attacker}
                        </span>{" "}
                        attacked{" "}
                        <span className="font-medium text-purple-600">
                          {turn.defender}
                        </span>
                        <br />
                        Attack Roll: {turn.attackRoll} | Defense Roll:{" "}
                        {turn.defenseRoll}
                        <br />
                        Damage Dealt: {turn.netDamage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TurboClashDerby;
