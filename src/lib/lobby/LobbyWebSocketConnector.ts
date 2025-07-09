import config from '$lib/config/config';
import WebSocketConnector from '$lib/websocket/WebSocketConnector';

class LobbyWebSocketConnector extends WebSocketConnector {
	constructor() {
		super(`${config.webSocketUrl}/lobby`);
	}
}

export const lobbyWebSocketConnector: LobbyWebSocketConnector = new LobbyWebSocketConnector();

export function connectAndAssignHandlers(accessToken: string) {
	lobbyWebSocketConnector.connect(accessToken);
}
