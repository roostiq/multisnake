<template>
	<div class="game-container">
		<canvas
			ref="gameCanvas"
			:width="dimensions.gameWidth"
			:height="dimensions.gameHeight"
		></canvas>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	onMounted,
	ref,
	onUnmounted,
	reactive,
} from "vue";

export default defineComponent({
	name: "SnakeGame",
	setup() {
		const gameCanvas = ref<HTMLCanvasElement | null>(
			null,
		);
		const context =
			ref<CanvasRenderingContext2D | null>(null);
		const socket = new WebSocket("ws://localhost:3000");

		const dimensions = reactive({
			gameWidth: 1,
			gameHeight: 1,
		});

		const drawGame = (state: any) => {
			if (context.value) {
				// Clear the canvas
				context.value.clearRect(
					0,
					0,
					gameCanvas.value!.width,
					gameCanvas.value!.height,
				);
				// Convert object of snakes to array and iterate over it
				Object.values(state.snakes).forEach(
					(snake: any) => {
						snake.segments.forEach(
							(segment: any) => {
								context.value!.fillStyle =
									"lime";
								context.value!.fillRect(
									segment.x * 10,
									segment.y * 10,
									10,
									10,
								);
							},
						);
					},
				);

				state.food.forEach((item: any) => {
					context.value!.fillStyle = "red";
					context.value!.fillRect(
						item.position.x * 10,
						item.position.y * 10,
						10,
						10,
					);
				});

				// TODO: Draw food and power-ups
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			let direction: string | null = null;
			switch (event.key) {
				case "ArrowUp":
					direction = "up";
					break;
				case "ArrowDown":
					direction = "down";
					break;
				case "ArrowLeft":
					direction = "left";
					break;
				case "ArrowRight":
					direction = "right";
					break;
			}
			if (direction) {
				socket.send(
					JSON.stringify({
						type: "change_direction",
						direction,
					}),
				);
			}
		};

		onMounted(() => {
			if (gameCanvas.value) {
				context.value =
					gameCanvas.value.getContext("2d");
			}

			window.addEventListener(
				"keydown",
				handleKeyDown,
			);
			socket.onmessage = (event) => {
				const message = JSON.parse(event.data);
				if (
					message.type === "gameSetup" &&
					message.dimensions
				) {
					dimensions.gameWidth =
						message.dimensions.width * 10;
					dimensions.gameHeight =
						message.dimensions.height * 10;
				} else {
					const state = JSON.parse(event.data);
					drawGame(state);
				}
			};
		});

		onUnmounted(() => {
			window.removeEventListener(
				"keydown",
				handleKeyDown,
			);
			socket.close();
		});

		return {
			gameCanvas,
			dimensions,
		};
	},
});
</script>

<style scoped>
.game-container {
	width: 300px;
	height: 300px;
	margin: auto;
}
canvas {
	border: 1px solid black;
}
</style>
