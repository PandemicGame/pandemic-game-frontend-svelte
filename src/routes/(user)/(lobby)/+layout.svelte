<script lang="ts">
	import { goto } from '$app/navigation';
	import { lobbyService } from '$lib/lobby/LobbyService';
	import {
		connectAndAssignHandlers,
		lobbyWebSocketConnector
	} from '$lib/lobby/LobbyWebSocketConnector';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const accessToken = lobbyService.getAccessToken();

		if (accessToken) {
			connectAndAssignHandlers(accessToken);
		} else {
			goto('/lobby/all');
		}

		return () => {
			lobbyWebSocketConnector.disconnect();
		};
	});
</script>

{@render children()}
