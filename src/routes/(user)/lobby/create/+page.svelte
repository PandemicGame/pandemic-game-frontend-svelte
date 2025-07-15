<script lang="ts">
	import { lobbyService } from '$lib/lobby/LobbyService';
	import { onMount } from 'svelte';

	let nameInputField = $state<HTMLInputElement | undefined>();

	onMount(() => nameInputField?.focus());

	let lobbyName = $state<string>('');

	let isLobbyNameEmpty = $derived<boolean>(lobbyName === '');

	function createLobbyOnEnterPressed(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			event.preventDefault();
			createLobby();
		}
	}

	function createLobby(): void {
		if (!isLobbyNameEmpty) {
			lobbyService.createLobby(lobbyName);
			lobbyName = '';
		}
	}
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<div class="flex w-lg flex-col gap-6 rounded p-8 shadow-md">
		<h1 class="text-2xl">Create Lobby</h1>
		<label class="label">
			<span class="label-text">Name</span>
			<input
				class="input"
				type="text"
				placeholder="Name"
				bind:value={lobbyName}
				bind:this={nameInputField}
				onkeydown={createLobbyOnEnterPressed} />
		</label>
		<div class="flex flex-row justify-end gap-2">
			<button
				class="btn preset-filled-primary-500"
				onclick={createLobby}
				onkeydown={createLobbyOnEnterPressed}
				disabled={isLobbyNameEmpty}>Create</button>
			<a
				href="/"
				class="btn preset-filled-error-500"
				draggable="false"
				data-sveltekit-preload-data="off">Cancel</a>
		</div>
	</div>
</div>
