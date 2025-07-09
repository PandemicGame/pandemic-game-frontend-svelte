import config from '$lib/config/config';
import WebSocketConnector from '$lib/websocket/WebSocketConnector';
import type WebSocketHandler from '$lib/websocket/WebSocketHandler';

class LobbyWebSocketConnector extends WebSocketConnector {
	constructor() {
		super(`${config.webSocketUrl}/lobby`);
	}
}

export const lobbyWebSocketConnector: LobbyWebSocketConnector = new LobbyWebSocketConnector();

export async function loadHandlers(): Promise<WebSocketHandler[]> {
	return [];
}
