import { goto } from '$app/navigation';
import WebSocketHandler from '$lib/websocket/WebSocketHandler';
import Lobby from './Lobby.type';
import LobbyAndAccessTokenHolder from './LobbyAndAccessTokenHolder.type';
import { lobbyService } from './LobbyService';
import { currentLobby, currentLobbyMember, lobbyStore } from './LobbyStore';

class LobbyWebSocketHandler extends WebSocketHandler {
	public handle(data: unknown): void {
		if (Array.isArray(data)) {
			if (data.every((item) => item instanceof Lobby)) {
				data.forEach((item) => lobbyService.addLobbyOwnerToLobby(item));
				lobbyStore.set(data);
			}
		} else if (data instanceof LobbyAndAccessTokenHolder) {
			lobbyService.storeAccessToken(data.accessToken);
			currentLobby.set(data.lobby);
			currentLobbyMember.set(data.lobby.findUserLobbyMemberById(data.member));
			goto('/lobby');
		} else if (data instanceof Lobby) {
			currentLobby.set(data);
		}
	}
}

export const lobbyWebSocketHandler: LobbyWebSocketHandler = new LobbyWebSocketHandler();
