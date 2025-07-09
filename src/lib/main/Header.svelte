<script lang="ts">
	import type User from '$lib/user/User.type';
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

<div class="flex w-full flex-row justify-end px-4 py-2">
	<div class="flex max-w-1/5 flex-col gap-2">
		<span class="truncate">You are logged in as: {user?.name}.</span>
		<a
			href="/logout"
			class="btn preset-filled-error-500 ml-auto font-bold"
			draggable="false"
			data-sveltekit-preload-data="off">
			Logout
		</a>
	</div>
</div>
