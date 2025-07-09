<script lang="ts">
	import Lobby from '$lib/lobby/Lobby.type';
	import { currentLobby } from '$lib/lobby/LobbyStore';

	let lobby = $state<Lobby | undefined>();

	currentLobby.subscribe((l) => (lobby = l));
</script>

<div class="flex h-screen w-screen flex-col justify-between gap-4 p-4">
	<div class="flex flex-col gap-4">
		<h1 class="text-center text-4xl">{lobby?.name}</h1>
	</div>
	<div class="flex flex-row justify-end gap-2">
		<a
			href="/"
			class="btn preset-filled-error-500"
			draggable="false"
			data-sveltekit-preload-data="off">Leave Lobby</a>
	</div>
</div>
