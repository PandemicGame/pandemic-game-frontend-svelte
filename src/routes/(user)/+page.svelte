<script lang="ts">
	import type User from '$lib/user/User';
	import { userStore } from '$lib/user/UserStore';
	import { onDestroy } from 'svelte';

	let user: User | undefined = $state();

	const unsubscribe = userStore.subscribe((u) => {
		user = u;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="h-screen w-screen">
	<h1>You are logged in as: {user?.name}.</h1>
	<a
		href="/logout"
		class="btn preset-filled-error-500 font-bold"
		data-sveltekit-preload-data="off">
		Logout
	</a>
</div>
