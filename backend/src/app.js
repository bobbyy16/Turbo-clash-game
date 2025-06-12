// src/app.js
const express = require("express");
const cors = require("cors");
const { createCar } = require("./models/Car");
const { createGame, executeTurn, getGameStatus } = require("./models/Game");

const app = express();

app.use(cors());
app.use(express.json());

let activeGame = null;

app.post("/api/game/start", (req, res) => {
  const { car1, car2 } = req.body;

  const player1 = createCar(
    car1.name,
    car1.health,
    car1.attackStrength,
    car1.defenseStrength
  );
  const player2 = createCar(
    car2.name,
    car2.health,
    car2.attackStrength,
    car2.defenseStrength
  );

  activeGame = createGame(player1, player2);

  res.json(getGameStatus(activeGame));
});

app.post("/api/game/turn", (req, res) => {
  if (!activeGame) {
    return res.status(400).json({ error: "No active game" });
  }

  try {
    const turnResult = executeTurn(activeGame);
    res.json(turnResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/game/status", (req, res) => {
  if (!activeGame) {
    return res.status(400).json({ error: "No active game" });
  }

  res.json(getGameStatus(activeGame));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
