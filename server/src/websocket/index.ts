import WebSocket, { Server as WebSocketServer } from 'ws';
import { Game } from '../game';
import * as http from 'http';

export function setupWebSocketServer(server: http.Server) {
	const wss = new WebSocketServer({ server });
	const game = new Game(broadcastGameState);

	function broadcastGameState() {
		const stateJson = JSON.stringify(game.getPublicGameState());
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(stateJson);
			}
		});
	}

	wss.on('connection', (ws: WebSocket) => {
		console.log('Client connected');

		const dimensions = game.getDimensions();
		const message = {
			type: 'gameSetup',
			dimensions: dimensions
		};
		ws.send(JSON.stringify(message));

		const playerId = generateUniqueId();

		game.addPlayer(playerId);

		ws.on('message', (message) => {
			const data = JSON.parse(message.toString());
			game.handleMessage(playerId, data);
		});

		ws.on('close', () => {
			console.log('Client disconnected');
			game.removePlayer(playerId);
		});
	});

	game.start();
}

function generateUniqueId() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
