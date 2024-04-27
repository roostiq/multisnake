# Multiplayer Snake Game Context

## Frontend (Vue.js & Canvas):
- **Component**: `App.vue` contains the canvas element and Vue setup logic.
- **State Management**: Utilizes Vue’s `reactive` for the game state and canvas size.
- **WebSocket Communication**: Establishes a connection to the backend and handles two-way messaging for game state updates and user inputs.
- **Rendering Logic**: Uses canvas methods to draw game elements based on received game state.
- **User Input Handling**: Captures arrow key events and sends direction changes to the server.

## Backend (Node.js with WebSocket):
- **Server Initialization**: `index.js` sets up the WebSocket server and integrates the game logic.
- **Game State Management**: `GameState` class encapsulates snake positions, food positions, and game dimensions, providing methods for state updates.
- **Collision Detection**: `CollisionManager` class checks for and handles collisions between snakes, food, and boundaries.
- **Game Loop**: Regular interval set to update the game state and broadcast to clients.
- **Dynamic Dimension Handling**: Game dimensions can be specified and are sent to clients upon connection or update.

## Shared Data and Types:
- **Type Definitions**: TypeScript interfaces or types ensure consistent data structures across the backend and frontend (e.g., Snake, Position, FoodItem).
- **Utilities**: Common utility functions like `randomPosition` are potentially shared between client and server to maintain consistent game logic (e.g., for food placement).

## Project Structure:
- **Client Directory**: Houses Vue components, utilities, and any static assets.
- **Server Directory**: Contains all server logic, classes for game state and collision handling, and entry point `index.js`.
- **Shared Types**: `types.d.ts` or `types.ts` provides shared type definitions, which may be placed in a root or shared directory if used by both client and server.

## Current Capabilities and Mechanics:
- **Snake Growth**: Implemented by setting a flag to skip tail removal during the next game tick after eating food.
- **Collision Outcomes**: Depending on the collision type (self, wall, or food), different outcomes are triggered, like game over or snake growth.
- **Dimension Communication**: The backend sends the game field dimensions to the frontend, where the canvas is dynamically sized to fit these dimensions.

## Upcoming Features and Considerations:
- **Starting a Game**: Process for initializing a new game, including setting initial positions for snakes and food.
- **Game Progression**: Handling game progression logic, including scoring, level changes, or speed adjustments.
- **Client Responsiveness**: Ensuring the game renders well on various screen sizes and aspect ratios.

## GitHub Commit References:
- **Version Control**: Commit history may provide insights into code changes, feature additions, and the progression of the project’s development.
