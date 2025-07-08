<script lang="ts">
	import { userWebSocketConnector } from '$lib/user/UserWebSocketConnector';
	import { onDestroy, onMount } from 'svelte';
	import Chat from './Chat.svelte';
	import { chatService } from './ChatService';
	import { globalChatIdStore } from './ChatStore';

	let globalChatId: number | undefined = $state();

	const unsubscribeGlobalChatId = globalChatIdStore.subscribe((i) => (globalChatId = i));

	onDestroy(() => {
		unsubscribeGlobalChatId();
	});

	onMount(() => {
		const unsubscribeWaitForWS = userWebSocketConnector.isAuthenticated.subscribe((c) => {
			if (c) {
				chatService.fetchGlobalChat();
				unsubscribeWaitForWS();
			}
		});
	});
</script>

<div class="h-full w-full">
	{#if globalChatId}
		<Chat chatId={globalChatId} />
	{/if}
</div>
