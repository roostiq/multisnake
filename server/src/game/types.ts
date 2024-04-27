export interface Position {
  x: number;
  y: number;
}

export interface SnakeSegment extends Position {
  x: number;
  y: number;
}

export interface Snake {
  id: string;
  segments: SnakeSegment[];
  direction: 'up' | 'down' | 'left' | 'right';  // Direction the snake is moving
  grow: boolean
}

export interface FoodItem {
  position: Position;
  type: string;  // Could be used to differentiate between types of food
  scoreValue: number;  // The score value this food provides when eaten
}

export interface GameState {
  snakes: Map<string, Snake> = new Map();;
  food: FoodItem[];
}

export type Direction = 'up' | 'down' | 'left' | 'right';
