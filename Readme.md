# TurboClashDerby

TurboClashDerby is an interactive, browser-based turn-based combat game where two cars battle it out using dice-rolling mechanics. Featuring smooth animations, engaging battle logs, and a modern UI built with React and Tailwind css, this game delivers a fun and competitive experience.

## 🚀 Features

- **Turn-based combat system** – Each car takes turns attacking and defending.
- **Animated dice rolling** – Adds an element of randomness and excitement.
- **Car stats system** – Each car has unique health, attack, and defense attributes.
- **Battle log** – Displays attack history and outcomes.

---

## 🛠️ Prerequisites

Ensure you have the following installed before starting:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)

---

## 📂 Project Structure

```
turbo-clash-derby/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TurboClashDerby.jsx
│   │   ├── App.jsx
│   │
│   ├── package.json
│   ├── tailwind.config.js
└── backend/
    ├── src/
    │   ├── app.js
    │   ├── models/
    ├── package.json
```

---

## ⚙️ Installation

### 1️⃣ Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### 2️⃣ Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd ../backend
npm install
```

---

## ▶️ Running the Application

### 1️⃣ Start the backend server:

```bash
cd backend/src
nodemon index.js
# Server will start on http://localhost:3001
```

### 2️⃣ Start the frontend development server:

```bash
cd frontend
npm run dev
# Application will be available at http://localhost:5173
```

---

## 📡 API Endpoints

The backend server exposes the following API endpoints:

### 🔹 Start a New Game

**Endpoint:** `POST /api/game/start`

**Request Body:**

```json
{
  "car1": {
    "name": "Thunderbolt",
    "health": 50,
    "attackStrength": 10,
    "defenseStrength": 5
  },
  "car2": {
    "name": "Iron Crusher",
    "health": 100,
    "attackStrength": 5,
    "defenseStrength": 10
  }
}
```

**Response:** Returns the initialized game state.

---

### 🔹 Execute a Turn

**Endpoint:** `POST /api/game/turn`

**Request Body:** (None required)

**Response:** Returns the updated game state and turn results.

---

## 🙌 Acknowledgments

- **[Lucide](https://lucide.dev/)** – Used for icons.
- **[Tailwind CSS](https://tailwindcss.com/)** – Used for styling.

---

### 💡 Have Fun Battling in TurboClashDerby! 🏎️🔥

Linkedin - https://linkedin.com/in/bobbyy16
github - https://github.com/bobbyy16
