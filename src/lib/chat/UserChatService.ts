import { userWebSocketConnector } from '$lib/user/UserWebSocketConnector';
import ChatService from './ChatService';
import GlobalChat from './GlobalChat.type';

class UserChatService extends ChatService {
	constructor() {
		super(userWebSocketConnector);
	}

	public fetchGlobalChat() {
		userWebSocketConnector.sendMessage('/chat/fetch', GlobalChat.GLOBAL_CHAT_IDENTIFIER);
	}
}

export const userChatService: UserChatService = new UserChatService();
