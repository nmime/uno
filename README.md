![57c19450ef3aa52a768b4567](https://github.com/nmime/uno/assets/66474195/eac4860a-23d9-4aa4-9b95-f06e430d51f1)
# UNO Card Game in Telegram Mini App

Welcome to the **UNO Card Game Telegram Mini App!** Dive into a vibrant and interactive UNO gaming experience, now conveniently accessible via Telegram.

## About UNO

UNO is an iconic card game that combines elements of skill, strategy, and luck. Players aim to deplete their hand of cards by matching the top card of the discard pile in color, number, or symbol, utilizing special action cards to turn the tides of the game. And remember - yell "UNO!" as you play your penultimate card!

## Project Overview

This project delivers an engaging, multi-player UNO experience, allowing you to enjoy the classic game with friends or fellow players worldwide.

### Key Features:

- **Multi-Player Gaming:** Engage in spirited rounds of UNO with friends or global players.
- **Speed & Timers:** Enjoy a fast-paced gaming experience with responsive controls and game timers to keep the action moving.
- **Powerful Design:** A visually stunning interface that combines aesthetics with intuitive functionality.
- **Convenient Use:** User-friendly design ensures an effortless and enjoyable gaming experience for players of all levels.
- **Wallet Pay:** Recharge your balance with ease for uninterrupted play.
- **Leaderboards & Statistics:** Monitor your progress, achievements, and gaming statistics.
- **Admin Panel:** A simple yet powerful admin panel for effective game management.
- **Regular Updates:** We’re committed to enhancing your gaming experience with upcoming features and improvements.

[Launch the Game](https://t.me/uno9bot/uno)

## Technology Stack

### Backend
- **Language:** TypeScript
- **Game Server:** Colyseus for efficient game state and room management.
- **Networking:** uWebSockets for high-performance, scalable WebSocket server & client library.

### Frontend
- **Language & Framework:** TypeScript and React, built on the Next.js framework.
- **Game Client:** Colyseus.js for smooth and responsive communication with the game server.

### Bot
- **Language:** TypeScript
- **Framework:** grammY, offering flexibility and efficiency in bot management.
- **Database:** MongoDB for swift and secure data handling.

## Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/nmime/uno.git
    cd uno
    ```

2. **Environment Setup:**
    - Ensure Node.js and Yarn are installed. Download them [here](https://nodejs.org/en/download/) and [here](https://yarnpkg.com/getting-started/install) if needed.
    - Fill the .env file with your specific values, using .env.example as a guide.

3. **Install Dependencies:**
    ```bash
    yarn install
    ```

## Running the Project

- **Development Mode:**
    ```bash
    yarn dev
    ```

- **Production Mode:**
    ```bash
    yarn build
    yarn start
    ```

## Contribute

We welcome your contributions and feedback to enhance the UNO Card Game on Telegram. Together, let’s elevate the gaming experience for players globally!

**Happy Gaming!**
