<script lang="ts">
	import Chat from '$lib/chat/Chat.svelte';
	import { lobbyChatService } from '$lib/chat/LobbyChatService';
	import GameOptions from '$lib/game/GameOptions.svelte';
	import Lobby from '$lib/lobby/Lobby.type';
	import { lobbyService } from '$lib/lobby/LobbyService';
	import { currentLobby, currentLobbyMember } from '$lib/lobby/LobbyStore';
	import UserLobbyMember from '$lib/lobby/UserLobbyMember.type';
	import NameableList from '$lib/util/NameableList.svelte';
	import { onDestroy } from 'svelte';

	let lobby = $state<Lobby | undefined>();

	const unsubsribeLobby = currentLobby.subscribe((l) => (lobby = l));

	let isGameStartable = $derived<boolean>((lobby?.members.length ?? 0) >= 2);

	let lobbyMember = $state<UserLobbyMember | undefined>();

	const unsubscribeLobbyMember = currentLobbyMember.subscribe((l) => (lobbyMember = l));

	onDestroy(() => {
		unsubsribeLobby();
		unsubscribeLobbyMember();
	});
</script>

<div class="grid h-screen w-screen grid-rows-[auto_1fr_auto] gap-4 p-4">
	<h1 class="text-center text-4xl">{lobby?.name}</h1>
	<div class="grid w-full grid-cols-3 gap-2">
		<div>
			{#if lobby}
				<NameableList nameables={lobby.members} />
			{/if}
		</div>
		<div>
			{#if lobby}
				<GameOptions {lobby} />
			{/if}
		</div>
		<div class="h-full w-full">
			{#if lobby}
				<Chat heading={'Lobby Chat'} chatId={lobby.chat} chatService={lobbyChatService} />
			{/if}
		</div>
	</div>
	<div class="flex flex-row justify-end gap-2">
		{#if lobbyMember && lobby?.isOwner(lobbyMember)}
			<button
				class="btn preset-filled-primary-500"
				onclick={lobbyService.startGame}
				disabled={!isGameStartable}>
				Start Game
			</button>
		{/if}
		<a
			href="/"
			class="btn preset-filled-error-500"
			draggable="false"
			data-sveltekit-preload-data="off">
			Leave Lobby
		</a>
	</div>
</div>
