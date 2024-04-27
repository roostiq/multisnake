import {
	GameState as IGameState,
	Snake,
	Position,
	Direction,
} from './types';
import { FoodItem } from "./types";
import { randomPosition } from './Utils';
export class GameState implements IGameState {
	public snakes = new Map<string, Snake>();
	public food: FoodItem[] = [];
	public width: number;
	public height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	addSnake(id: string) {
		const initialPosition: Position = this.generateInitialPosition();
		const snake: Snake = {
			id,
			segments: [initialPosition],
			direction: 'right' as Direction,
			grow: false,
		};
		this.snakes.set(id, snake);
	}

	getSnake(id: string): Snake | undefined {
		return this.snakes.get(id);
	}

	removeSnake(id: string) {
		this.snakes.delete(id);
	}

	addFood() {
		const food: FoodItem = {
			position: randomPosition(60, 40),
			type: 'apple',
			scoreValue: 1
		};
		this.food.push(food);
	}

	removeFood(index: number) {
		this.food.splice(index, 1);
	}

	handleDirectionChange(playerId: string, direction: Direction) {
		const snake = this.getSnake(playerId);
		if (snake && this.isValidDirection(snake.direction, direction)) {
			snake.direction = direction;
		}
	}

	isValidDirection(currentDirection: Direction, newDirection: Direction): boolean {
		const oppositeDirections: { [key in Direction]: Direction } = {
			up: 'down',
			down: 'up',
			left: 'right',
			right: 'left'
		};
		return oppositeDirections[currentDirection] !== newDirection;
	}

	updateSnakes() {
		this.snakes.forEach(snake => {
			this.moveSnake(snake);
		});
	}

	private moveSnake(snake: Snake) {
		const head = snake.segments[0];
		const newHead = this.getNewHeadPosition(head, snake.direction);
		snake.segments.unshift(newHead);
		if (!snake.grow) {
			snake.segments.pop();
		} else {
			snake.grow = false;
		}
	}

	private getNewHeadPosition(head: Position, direction: Direction): Position {
		let newPosition = { ...head };
		switch (direction) {
			case 'up': newPosition.y -= 1; break;
			case 'down': newPosition.y += 1; break;
			case 'left': newPosition.x -= 1; break;
			case 'right': newPosition.x += 1; break;
		}
		return newPosition;
	}

	private generateInitialPosition(): Position {
		return { x: 10, y: 10 };
	}

	getPublicGameState() {
		let publicSnakes = Array.from(this.snakes.values()).map(snake => ({
			id: snake.id,
			segments: snake.segments,
			direction: snake.direction
		}));

		return {
			snakes: publicSnakes,
			food: this.food
		};
	}
}
