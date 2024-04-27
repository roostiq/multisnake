import WebSocket from 'ws';
import { GameState } from './GameState';
import { CollisionManager } from './CollisionManager';
import { GameRules } from './GameRules';

export class Game {
	private gameState = new GameState(60, 40);
	private collisionManager = new CollisionManager(this.gameState);
	private gameRules = new GameRules(this.gameState);
	private intervalId: NodeJS.Timeout | null = null;
	private broadcastGameState: () => void;

	constructor(broadcastMethod: () => void) {
		this.broadcastGameState = broadcastMethod;
	}

	init() {
		this.gameState.addFood();
	}

	start() {

		this.init();
		this.intervalId = setInterval(() => {
			this.update();
		}, 100);
	}

	stop() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	update() {
		this.gameState.updateSnakes();
		this.collisionManager.checkCollisions();
		this.gameRules.applyRules();
		this.broadcastGameState();
	}

	handleMessage(id: string, data: any) {
		if (data.type === 'change_direction') {
			this.gameState.handleDirectionChange(id, data.direction);
		}
	}

	addPlayer(id: string) {
		this.gameState.addSnake(id);
	}
	removePlayer(id: string) {
		this.gameState.removeSnake(id);
	}

	getPublicGameState() {
		return this.gameState.getPublicGameState();
	}

	getDimensions() {
		return { width: this.gameState.width, height: this.gameState.height };
	}
}
