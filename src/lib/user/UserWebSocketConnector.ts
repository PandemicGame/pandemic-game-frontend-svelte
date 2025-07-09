import { chatWebSocketHandler } from '$lib/chat/ChatWebSocketHandler';
import config from '$lib/config/config';
import { lobbyWebSocketHandler } from '$lib/lobby/LobbyWebSocketHandler';
import WebSocketConnector from '$lib/websocket/WebSocketConnector';
import { userWebSocketHandler } from './UserWebSocketHandler';

class UserWebSocketConnector extends WebSocketConnector {
	constructor() {
		super(`${config.webSocketUrl}/user`);
	}
}

export const userWebSocketConnector: UserWebSocketConnector = new UserWebSocketConnector();

export function connectAndAssignHandlers(accessToken: string) {
	userWebSocketConnector.connect(accessToken);
	userWebSocketConnector.addHandler(userWebSocketHandler);
	userWebSocketConnector.addHandler(chatWebSocketHandler);
	userWebSocketConnector.addHandler(lobbyWebSocketHandler);
}
