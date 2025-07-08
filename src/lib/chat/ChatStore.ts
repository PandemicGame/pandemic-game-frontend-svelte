import { writable, type Writable } from 'svelte/store';
import type ChatMessage from './ChatMessage.type';

const chatMessageMap: Map<number, Writable<ChatMessage[]>> = new Map();

export function getChatStore(chatId: number): Writable<ChatMessage[]> {
	if (!chatMessageMap.has(chatId)) {
		chatMessageMap.set(chatId, writable([]));
	}
	return chatMessageMap.get(chatId)!;
}

export function updateChatStore(chatId: number, messages: ChatMessage[]) {
	getChatStore(chatId).set(messages);
}

export function addChatMessage(message: ChatMessage) {
	const chatId = message.chat;
	if (chatId) {
		const store = getChatStore(chatId);
		store.update((messages) => [...messages, message]);
	}
}
