<script lang="ts">
	import GlobalChat from '$lib/chat/GlobalChat.svelte';
	import ActiveUserList from '$lib/user/ActiveUserList.svelte';
	import MainMenu from './MainMenu.svelte';
</script>

<div class="grid grid-cols-[var(--larmcw)_1fr_var(--larmcw)] gap-x-4 overflow-hidden p-4">
	<div class="h-full overflow-hidden">
		<ActiveUserList />
	</div>
	<div>
		<MainMenu />
	</div>
	<div class="h-full overflow-hidden">
		<GlobalChat />
	</div>
</div>

<style>
	:root {
		--left-and-right-main-content-width: 25rem;
		--larmcw: var(--left-and-right-main-content-width);
	}
</style>
