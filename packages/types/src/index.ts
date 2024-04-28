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
   direction: Direction;
   grow: boolean
}

export interface FoodItem {
   position: Position;
   type: string;
   scoreValue: number;
}

export interface GameState {
   snakes: Map<string, Snake>;
   food: FoodItem[];
}

export type Direction = 'up' | 'down' | 'left' | 'right';
