<script lang="ts">
	import { userService } from '$lib/user/UserService';
	import { userStore } from '$lib/user/UserStore';
	import { userWebSocketConnector } from '$lib/user/UserWebSocketConnector.js';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	const accessToken = data.userAccessToken;

	onMount(() => {
		(async () => {
			const user = await userService.getUserInfo(accessToken);
			userStore.set(user);
		})();

		userWebSocketConnector.connect(accessToken);

		return () => {
			userWebSocketConnector.disconnect();
		};
	});
</script>

{@render children()}
