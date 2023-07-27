# UNO Card Game for Telegram Web App

Welcome to the UNO card game for Telegram Web App! This is a monorepo repository which contains the front-end, back-end,
and bot apps.

This project is a multi-player game of UNO that you can play with your friends via Telegram. The bot app handles user
interactions and communicates with the backend which runs the game logic, and the front-end app handles the display and
user interface.

## Technology Stack

**Backend:** The backend of this application is built with TypeScript for robust typing and maintainability. We use
Colyseus, a multiplayer game server for Node.js, to manage game states and rooms. To facilitate fast, efficient
networking, we use uWebSockets, a highly scalable WebSocket server & client library.

**Frontend:** The frontend is built with TypeScript and React, using the Next.js framework. We
use Colyseus.js, the JavaScript client for Colyseus, to communicate with the game server.

**Bot:** The bot is built with TypeScript, and uses grammY, a flexible Telegram bot framework. For database management,
we use MongoDB to store and retrieve data.

## Installation

First, clone the repository to your local machine using git:

```bash
git clone https://github.com/NMIFUN/uno.git
cd repo
```

You need to have Node.js and Yarn installed on your machine. If you don't have them, you can install
from [here](https://nodejs.org/en/download/) and [here](https://yarnpkg.com/getting-started/install) respectively. After
you have Node.js and Yarn on your machine, install the project dependencies by running:

```bash
yarn install
```

## Running the Project

To start the project in development mode, use:

```bash
yarn dev
```

To build and start the project in production mode, use:

```bash
yarn build
yarn start
```
