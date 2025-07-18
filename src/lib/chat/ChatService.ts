import Service from '$lib/Service';
import type WebSocketConnector from '$lib/websocket/WebSocketConnector';
import { addTypeInfo } from '$lib/websocket/WebSocketMapper';
import ChatMessage from './ChatMessage.type';
import type ChatMessageSender from './ChatMessageSender.type';

export default abstract class ChatService extends Service {
	constructor(protected readonly webSocketConnector: WebSocketConnector) {
		super();
	}

	public postMessage(chatId: number, message: string): void {
		const chatMessage = {
			chatId: chatId,
			message: message
		};
		this.webSocketConnector.sendMessage('/chat/send', addTypeInfo(chatMessage, ChatMessage));
	}

	public parseChatMessageDate(message: ChatMessage): void {
		message.createdAt = new Date(message.createdAt);
	}

	public addChatMessageSenders(senders: ChatMessageSender[], messages: ChatMessage[]): void {
		const sendersById = this.createIdToChatMessageSenderMap(senders);
		messages.forEach((message) => {
			if (typeof message.sender === 'number') {
				const sender = sendersById.get(message.sender);
				if (sender) {
					message.sender = sender;
				}
			}
		});
	}

	public createIdToChatMessageSenderMap(
		senders: ChatMessageSender[]
	): Map<number, ChatMessageSender> {
		return new Map(senders.filter(this.hasId).map((sender) => [sender.id, sender]));
	}
}
