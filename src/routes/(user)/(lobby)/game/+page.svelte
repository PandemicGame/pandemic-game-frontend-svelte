<script lang="ts">
	import Board from '$lib/game/board/Board.svelte';
	import Game from '$lib/game/Game.type';
	import { currentGame } from '$lib/game/GameStore';
	import { onDestroy } from 'svelte';

	let game = $state<Game | undefined>();

	const unsubscribe = currentGame.subscribe((g) => (game = g));

	onDestroy(() => unsubscribe());

	let boardComponent = $state<Board | undefined>();
</script>

<div class="grid h-screen w-screen grid-cols-[1fr_auto]">
	<div class="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto_auto]">
		<div class="z-10 col-[1_/_span_3] row-[1_/_span_3]">
			{#if game}
				<Board {game} bind:this={boardComponent} />
			{/if}
		</div>
		<div class="z-20 col-3 row-1">
			<div class="size-40 bg-black">Plague Cubes</div>
		</div>
		<div class="z-20 col-1 row-[3_/_span_2]">
			<div class="h-80 w-full bg-black">Outbreak Marker</div>
		</div>
		<div class="z-10 col-[2_/_span_2] row-4">
			<div class="h-40 w-full bg-black">Actions</div>
		</div>
	</div>
	<div>
		<div>Player Information</div>
	</div>
</div>
