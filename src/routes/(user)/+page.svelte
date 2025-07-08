<script lang="ts">
	import GlobalChat from '$lib/chat/GlobalChat.svelte';
	import ActiveUserList from '$lib/user/ActiveUserList.svelte';
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

<div class="grid h-screen w-screen grid-cols-[100dvw] grid-rows-[6rem_1fr]">
	<div class="flex flex-row justify-end px-4 py-2">
		<div class="flex flex-col gap-2">
			<h1>You are logged in as: {user?.name}.</h1>
			<a
				href="/logout"
				class="btn preset-filled-error-500 ml-auto font-bold"
				draggable="false"
				data-sveltekit-preload-data="off">
				Logout
			</a>
		</div>
	</div>

	<div class="grid grid-cols-[var(--larmcw)_1fr_var(--larmcw)] gap-x-4 overflow-hidden p-4">
		<div>
			<ActiveUserList />
		</div>
		<div></div>
		<div class="h-full overflow-hidden">
			<GlobalChat />
		</div>
	</div>
</div>

<style>
	:root {
		--left-and-right-main-content-width: 25rem;
		--larmcw: var(--left-and-right-main-content-width);
	}
</style>
