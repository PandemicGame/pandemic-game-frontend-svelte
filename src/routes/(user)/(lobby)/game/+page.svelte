<script lang="ts">
	import handleMoveAction from '$lib/game/action/handlers/handleMoveActions';
	import Board from '$lib/game/board/Board.svelte';
	import Game from '$lib/game/Game.type';
	import { gameService } from '$lib/game/GameService';
	import { currentGame, currentPlayer } from '$lib/game/GameStore';
	import Player from '$lib/game/player/Player.type';
	import PlayerInformationList from '$lib/game/player/PlayerInformationList.svelte';
	import ContextMenu from '$lib/util/ContextMenu.svelte';
	import { onDestroy } from 'svelte';

	let game = $state<Game | undefined>();
	let player = $state<Player | undefined>();

	const unsubscribeGame = currentGame.subscribe((g) => (game = g));
	const unsubscribePlayer = currentPlayer.subscribe((p) => (player = p));

	onDestroy(() => {
		unsubscribeGame();
		unsubscribePlayer();
	});

	let boardComponent = $state<Board | undefined>();
	let contextMenuComponent = $state<ContextMenu | undefined>();

	$effect(() => {
		if (game && player && boardComponent && contextMenuComponent) {
			const availableActions = game.getAvailableActions();
			if (availableActions.length > 0 && gameService.canPlayerExecuteActions(player, game)) {
				handleMoveAction(availableActions, boardComponent, contextMenuComponent);
			}
		}
	});
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
		<PlayerInformationList players={game?.playersInTurnOrder ?? []} />
	</div>

	<ContextMenu bind:this={contextMenuComponent} />
</div>
