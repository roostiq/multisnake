export function randomPosition(maxX: number, maxY: number) {
	return {
		x: Math.floor(Math.random() * maxX),
		y: Math.floor(Math.random() * maxY)
	};
}