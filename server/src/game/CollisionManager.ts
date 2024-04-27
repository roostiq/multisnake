// CollisionManager.ts
import { GameState } from './GameState';
import {
	Snake,
} from './types';
export class CollisionManager {
	constructor(private gameState: GameState) { }

	checkCollisions() {
		this.gameState.snakes.forEach((snake, id) => {
			this.checkWallCollision(snake);
			this.checkSelfCollision(snake);
			this.checkFoodCollision(snake);
		});
	}

	private checkWallCollision(snake: Snake) {
		const head = snake.segments[0];
		if (head.x < 0) {
			head.x = this.gameState.width - 1;
		} else if (head.x >= this.gameState.width) {
			head.x = 0;
		} else if (head.y < 0) {
			head.y = this.gameState.height - 1;
		} else if (head.y >= this.gameState.height) {
			head.y = 0;
		}
	}

	private checkSelfCollision(snake: Snake) {
		const head = snake.segments[0];

		for (let i = 1; i < snake.segments.length; i++) {
			if (head.x === snake.segments[i].x && head.y === snake.segments[i].y) {
				// TODO
				break;
			}
		}
	}

	private checkFoodCollision(snake: Snake) {
		const head = snake.segments[0];
		this.gameState.food.forEach((food, index) => {
			if (head.x === food.position.x && head.y === food.position.y) {
				this.gameState.removeFood(index);
				snake.grow = true;
				this.gameState.addFood();
			}
		});
	}
}
