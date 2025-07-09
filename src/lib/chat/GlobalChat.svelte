<script lang="ts">
	import { userWebSocketConnector } from '$lib/user/UserWebSocketConnector';
	import { onDestroy, onMount } from 'svelte';
	import Chat from './Chat.svelte';
	import { globalChatIdStore } from './ChatStore';
	import { userChatService } from './UserChatService';

	let globalChatId: number | undefined = $state();

	const unsubscribeGlobalChatId = globalChatIdStore.subscribe((i) => (globalChatId = i));

	onDestroy(() => {
		unsubscribeGlobalChatId();
	});

	onMount(() => {
		const unsubscribeWaitForWS = userWebSocketConnector.isAuthenticated.subscribe((c) => {
			if (c) {
				userChatService.fetchGlobalChat();
			}
		});
		return () => unsubscribeWaitForWS();
	});
</script>

<div class="h-full w-full overflow-hidden">
	{#if globalChatId}
		<Chat heading={'Global Chat'} chatId={globalChatId} chatService={userChatService} />
	{/if}
</div>
