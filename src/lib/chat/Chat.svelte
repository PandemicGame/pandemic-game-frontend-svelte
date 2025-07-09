<script lang="ts">
	import { onDestroy } from 'svelte';
	import type ChatMessage from './ChatMessage.type';
	import ChatMessageSender from './ChatMessageSender.type';
	import type ChatService from './ChatService';
	import { getChatStore } from './ChatStore';

	let {
		heading,
		chatId,
		chatService
	}: {
		heading: string;
		chatId: number;
		chatService: ChatService;
	} = $props();

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

<div class="grid h-full w-full grid-rows-[auto_1fr_auto] gap-4 overflow-hidden">
	<h2 class="text-xl font-bold">{heading}</h2>

	<ul class="w-full overflow-y-scroll">
		{#each messages as message}
			<li class="flex w-full flex-row gap-2">
				<strong class="flex max-w-1/2 min-w-1/4">
					<span class="min-w-0 flex-auto truncate">
						{getChatMessageSenderName(message)}
					</span>
					<span class="shrink-0">
						[{message.createdAt?.toLocaleString()}]
					</span>
					<span class="shrink-0">:</span>
				</strong>
				<span>
					{message.message}
				</span>
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
