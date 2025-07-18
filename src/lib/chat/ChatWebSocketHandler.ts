import WebSocketHandler from '$lib/websocket/WebSocketHandler';
import Chat from './Chat.type';
import ChatMessage from './ChatMessage.type';
import { addChatMessage, globalChatIdStore, updateChatStore } from './ChatStore';
import GlobalChat from './GlobalChat.type';
import { userChatService } from './UserChatService';

class ChatWebSocketHandler extends WebSocketHandler {
	public handle(data: unknown): void {
		if (data instanceof ChatMessage) {
			userChatService.parseChatMessageDate(data);
			addChatMessage(data);
		} else if (data instanceof Chat) {
			if (data instanceof GlobalChat) {
				globalChatIdStore.set(data.id);
			}
			userChatService.addChatMessageSenders(data.members, data.messages);
			data.messages.forEach(userChatService.parseChatMessageDate);
			updateChatStore(data.id, data.messages);
		}
	}
}

export const chatWebSocketHandler: ChatWebSocketHandler = new ChatWebSocketHandler();
