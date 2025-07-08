import WebSocketHandler from '$lib/websocket/WebSocketHandler';
import Chat from './Chat.type';
import ChatMessage from './ChatMessage.type';
import { chatService } from './ChatService';
import { addChatMessage, globalChatIdStore, updateChatStore } from './ChatStore';
import GlobalChat from './GlobalChat.type';

class ChatWebSocketHandler extends WebSocketHandler {
	public handle(data: unknown): void {
		if (data instanceof ChatMessage) {
			chatService.parseChatMessageDate(data);
			addChatMessage(data);
		} else if (data instanceof Chat) {
			if (data instanceof GlobalChat) {
				globalChatIdStore.set(data.id);
			}
			chatService.addChatMessageSenders(data.members ?? [], data.messages ?? []);
			if (data.id) {
				data.messages?.forEach(chatService.parseChatMessageDate);
				updateChatStore(data.id, data.messages ?? []);
			}
		}
	}
}

export const chatWebSocketHandler: ChatWebSocketHandler = new ChatWebSocketHandler();
