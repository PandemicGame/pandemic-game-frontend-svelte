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

	let isLobbyOwner = $derived(lobbyMember && lobby.isOwner(lobbyMember));

	let boardTypes = $derived<BoardType[]>(lobby.gameOptions.availableBoardTypes);

	let selectedBoardTypeId = $state<number>(lobby.gameOptions.selectedBoardTypeId);

	$effect(() => {
		selectedBoardTypeId = lobby.gameOptions.selectedBoardTypeId;
	});

	function updateGameOptions() {
		if (isLobbyOwner) {
			const gameOptions = lobby.gameOptions;
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
		<select
			bind:value={selectedBoardTypeId}
			onchange={updateGameOptions}
			disabled={!isLobbyOwner}
			class="select">
			{#each boardTypes as boardType}
				<option value={boardType.id}>
					{boardType.name}
				</option>
			{/each}
		</select>
	</form>
</div>
