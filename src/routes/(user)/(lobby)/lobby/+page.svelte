<script lang="ts">
	import Chat from '$lib/chat/Chat.svelte';
	import { lobbyChatService } from '$lib/chat/LobbyChatService';
	import Lobby from '$lib/lobby/Lobby.type';
	import { lobbyService } from '$lib/lobby/LobbyService';
	import { currentLobby } from '$lib/lobby/LobbyStore';
	import NameableList from '$lib/util/NameableList.svelte';

	let lobby = $state<Lobby | undefined>();

	currentLobby.subscribe((l) => (lobby = l));
</script>

<div class="grid h-screen w-screen grid-rows-[auto_1fr_auto] gap-4 p-4">
	<h1 class="text-center text-4xl">{lobby?.name}</h1>
	<div class="grid w-full grid-cols-3 gap-2">
		<div>
			{#if lobby?.members}
				<NameableList nameables={lobby.members} />
			{/if}
		</div>
		<div></div>
		<div class="h-full w-full">
			{#if lobby?.chat}
				<Chat heading={'Lobby Chat'} chatId={lobby?.chat} chatService={lobbyChatService} />
			{/if}
		</div>
	</div>
	<div class="flex flex-row justify-end gap-2">
		<button class="btn preset-filled-primary-500" onclick={lobbyService.startGame}>
			Start Game
		</button>
		<a
			href="/"
			class="btn preset-filled-error-500"
			draggable="false"
			data-sveltekit-preload-data="off">
			Leave Lobby
		</a>
	</div>
</div>
