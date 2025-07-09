import config from '$lib/config/config';
import WebSocketConnector from '$lib/websocket/WebSocketConnector';
import type WebSocketHandler from '$lib/websocket/WebSocketHandler';

class UserWebSocketConnector extends WebSocketConnector {
	constructor() {
		super(`${config.webSocketUrl}/user`);
	}
}

export const userWebSocketConnector: UserWebSocketConnector = new UserWebSocketConnector();

export async function loadHandlers(): Promise<WebSocketHandler[]> {
	const { chatWebSocketHandler } = await import('$lib/chat/ChatWebSocketHandler');
	const { lobbyWebSocketHandler } = await import('$lib/lobby/LobbyWebSocketHandler');
	const { userWebSocketHandler } = await import('./UserWebSocketHandler');
	return [chatWebSocketHandler, lobbyWebSocketHandler, userWebSocketHandler];
}
