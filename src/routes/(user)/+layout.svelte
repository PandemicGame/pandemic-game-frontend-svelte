<script lang="ts">
	import { userService } from '$lib/user/UserService';
	import { userStore } from '$lib/user/UserStore';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	const accessToken = data.userAccessToken;

	onMount(async () => {
		const user = await userService.getUserInfo(accessToken);
		userStore.set(user);
	});
</script>

{@render children()}
