<script lang="ts">
	import { onDestroy } from 'svelte';
	import type ChatMessage from './ChatMessage.type';
	import ChatMessageSender from './ChatMessageSender.type';
	import { chatService } from './ChatService';
	import { getChatStore } from './ChatStore';

	let { chatId }: { chatId: number } = $props();

	let messages = $state<ChatMessage[]>([]);

	const unsubscribe = getChatStore(chatId).subscribe((m) => (messages = m));

	onDestroy(() => {
		unsubscribe();
	});

	let messageToSend = $state<string>('');

	let isMessageToSendEmpty = $derived<boolean>(messageToSend === '');

	function sendMessageOnEnterPressed(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			event.preventDefault();
			sendMessage();
		}
	}

	function sendMessage(): void {
		if (!isMessageToSendEmpty) {
			chatService.postMessage(chatId, messageToSend);
			messageToSend = '';
		}
	}

	function getChatMessageSenderName(message: ChatMessage): string {
		if (message.sender && message.sender instanceof ChatMessageSender) {
			return message.sender.name ?? '';
		}
		return '';
	}
</script>

<div class="flex h-full w-full flex-col gap-4 overflow-hidden">
	<ul class="overflow-y-scroll">
		{#each messages as message}
			<li>
				<strong>
					{getChatMessageSenderName(message)}
					[{message.createdAt?.toLocaleString()}]:
				</strong>
				{message.message}
			</li>
		{/each}
	</ul>

	<label class="label">
		<span class="label-text">Message</span>
		<div class="flex flex-row gap-2">
			<input
				class="input"
				type="text"
				placeholder="Message"
				bind:value={messageToSend}
				onkeydown={sendMessageOnEnterPressed} />
			<button
				class="btn preset-filled-primary-500"
				onclick={sendMessage}
				onkeydown={sendMessageOnEnterPressed}
				disabled={isMessageToSendEmpty}>Send</button>
		</div>
	</label>
</div>
