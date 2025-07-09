import { browser } from '$app/environment';
import Service from '$lib/Service';
import { userWebSocketConnector } from '$lib/user/UserWebSocketConnector';

class LobbyService extends Service {
	public static readonly LOBBY_MEMBER_ACCESS_TOKEN_KEY = 'lobbyMemberAccessToken';

	public createLobby(name: string) {
		userWebSocketConnector.sendMessage('/lobby/create', name);
	}

	public storeAccessToken(accessToken: string): void {
		if (browser) {
			sessionStorage.setItem(LobbyService.LOBBY_MEMBER_ACCESS_TOKEN_KEY, accessToken);
		}
	}
}

export const lobbyService: LobbyService = new LobbyService();
