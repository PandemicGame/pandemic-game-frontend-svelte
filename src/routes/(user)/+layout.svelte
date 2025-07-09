<script lang="ts">
	import { userService } from '$lib/user/UserService';
	import { userStore } from '$lib/user/UserStore';
	import { loadHandlers, userWebSocketConnector } from '$lib/user/UserWebSocketConnector';
	import { connectAndAssignHandlers } from '$lib/websocket/WebSocketConnector.js';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	const accessToken = data.userAccessToken;

	onMount(() => {
		(async () => {
			const user = await userService.getUserInfo(accessToken);
			userStore.set(user);

			connectAndAssignHandlers(userWebSocketConnector, accessToken, await loadHandlers());
		})();

		return () => {
			userWebSocketConnector.disconnect();
		};
	});
</script>

{@render children()}
