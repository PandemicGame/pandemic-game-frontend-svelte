import WebSocketHandler from '$lib/websocket/WebSocketHandler';
import LobbyAndAccessTokenHolder from './LobbyAndAccessTokenHolder.type';
import { lobbyService } from './LobbyService';
import { currentLobby } from './LobbyStore';

class LobbyWebSocketHandler extends WebSocketHandler {
	public handle(data: unknown): void {
		if (data instanceof LobbyAndAccessTokenHolder) {
			if (data.accessToken && data.lobby) {
				lobbyService.storeAccessToken(data.accessToken);
				currentLobby.set(data.lobby);
			}
		}
	}
}

export const lobbyWebSocketHandler: LobbyWebSocketHandler = new LobbyWebSocketHandler();
