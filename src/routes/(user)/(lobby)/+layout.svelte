<script lang="ts">
	import { goto } from '$app/navigation';
	import { lobbyService } from '$lib/lobby/LobbyService';
	import { loadHandlers, lobbyWebSocketConnector } from '$lib/lobby/LobbyWebSocketConnector';
	import { connectAndAssignHandlers } from '$lib/websocket/WebSocketConnector';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const accessToken = lobbyService.getAccessToken();

		if (accessToken) {
			(async () => {
				connectAndAssignHandlers(
					lobbyWebSocketConnector,
					accessToken,
					await loadHandlers()
				);
			})();
		} else {
			goto('/lobby/all');
		}

		return () => {
			lobbyWebSocketConnector.disconnect();
		};
	});
</script>

{@render children()}
