import { goto } from '$app/navigation';
import config from '$lib/config/config';
import WebSocketConnector from '$lib/websocket/WebSocketConnector';
import type WebSocketHandler from '$lib/websocket/WebSocketHandler';

class LobbyWebSocketConnector extends WebSocketConnector {
	constructor() {
		super(`${config.webSocketUrl}/lobby`);
	}

	protected handleClose(): void {
		this.handlers = [];
		goto('/');
	}
}

export const lobbyWebSocketConnector: LobbyWebSocketConnector = new LobbyWebSocketConnector();

export async function loadHandlers(): Promise<WebSocketHandler[]> {
	const { chatWebSocketHandler } = await import('$lib/chat/ChatWebSocketHandler');
	const { lobbyWebSocketHandler } = await import('$lib/lobby/LobbyWebSocketHandler');
	const { gameWebSocketHandler } = await import('$lib/game/GameWebSocketHandler');
	return [chatWebSocketHandler, lobbyWebSocketHandler, gameWebSocketHandler];
}
