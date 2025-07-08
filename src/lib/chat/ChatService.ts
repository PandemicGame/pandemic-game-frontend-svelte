import Service from '$lib/Service';
import { userWebSocketConnector } from '$lib/user/UserWebSocketConnector';
import { addTypeInfo } from '$lib/websocket/WebSocketMapper';
import ChatMessage from './ChatMessage.type';
import type ChatMessageSender from './ChatMessageSender.type';
import GlobalChat from './GlobalChat.type';

class ChatService extends Service {
	public postMessage(chatId: number, message: string): void {
		const chatMessage = {
			chatId: chatId,
			message: message
		};
		userWebSocketConnector.sendMessage('/chat/send', addTypeInfo(chatMessage, ChatMessage));
	}

	public parseChatMessageDate(message: ChatMessage): void {
		if (message.createdAt) {
			message.createdAt = new Date(message.createdAt);
		}
	}

	public addChatMessageSenders(senders: ChatMessageSender[], messages: ChatMessage[]): void {
		const sendersById = this.createIdToChatMessageSenderMap(senders);
		messages.forEach((message) => {
			if (message.sender && typeof message.sender === 'number') {
				message.sender = sendersById.get(message.sender);
			}
		});
	}

	public createIdToChatMessageSenderMap(
		senders: ChatMessageSender[]
	): Map<number, ChatMessageSender> {
		return new Map(senders.filter(this.hasId).map((sender) => [sender.id, sender]));
	}

	public fetchGlobalChat() {
		userWebSocketConnector.sendMessage('/chat/fetch', GlobalChat.GLOBAL_CHAT_IDENTIFIER);
	}
}

export const chatService: ChatService = new ChatService();
