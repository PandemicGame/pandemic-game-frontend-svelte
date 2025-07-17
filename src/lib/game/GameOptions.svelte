<script lang="ts">
	import type Lobby from '$lib/lobby/Lobby.type';
	import { lobbyService } from '$lib/lobby/LobbyService';
	import { currentLobbyMember } from '$lib/lobby/LobbyStore';
	import type UserLobbyMember from '$lib/lobby/UserLobbyMember.type';
	import { onDestroy } from 'svelte';
	import BoardType from './board/BoardType.type';

	const { lobby }: { lobby: Lobby } = $props();

	let lobbyMember = $state<UserLobbyMember | undefined>();

	const unsubscribeLobbyMember = currentLobbyMember.subscribe((l) => (lobbyMember = l));

	let boardTypes = $derived<BoardType[] | undefined>(lobby.gameOptions?.availableBoardTypes);

	let selectedBoardTypeId = $state<number | undefined>();

	$effect(() => {
		selectedBoardTypeId = lobby.gameOptions?.selectedBoardTypeId;
	});

	function updateGameOptions(e: SubmitEvent) {
		e.preventDefault();

		const gameOptions = lobby.gameOptions;
		if (gameOptions) {
			gameOptions.selectedBoardTypeId = selectedBoardTypeId;
			lobbyService.updateGameOptions(gameOptions);
		}
	}

	onDestroy(() => {
		unsubscribeLobbyMember();
	});
</script>

<div>
	<form class="mx-auto w-full max-w-md space-y-4 text-center" onsubmit={updateGameOptions}>
		{#if boardTypes}
			<select bind:value={selectedBoardTypeId} class="select">
				{#each boardTypes as boardType}
					<option value={boardType.id}>
						{boardType.name}
					</option>
				{/each}
			</select>
		{/if}

		{#if lobbyMember && lobby?.isOwner(lobbyMember)}
			<button type="submit" class="btn preset-filled-primary-500">Update options</button>
		{/if}
	</form>
</div>
