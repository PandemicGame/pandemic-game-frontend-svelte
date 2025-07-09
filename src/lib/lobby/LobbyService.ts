import { browser } from '$app/environment';
import Service from '$lib/Service';
import { userWebSocketConnector } from '$lib/user/UserWebSocketConnector';
import type Lobby from './Lobby.type';
import type LobbyMember from './LobbyMember.type';

class LobbyService extends Service {
	public static readonly LOBBY_MEMBER_ACCESS_TOKEN_KEY = 'lobbyMemberAccessToken';

	public fetchAllLobbies() {
		userWebSocketConnector.sendMessage('/lobby/fetch', 'ALL');
	}

	public createLobby(name: string) {
		userWebSocketConnector.sendMessage('/lobby/create', name);
	}

	public joinLobby(id: number) {
		userWebSocketConnector.sendMessage('/lobby/join', `${id}`);
	}

	public storeAccessToken(accessToken: string): void {
		if (browser) {
			sessionStorage.setItem(LobbyService.LOBBY_MEMBER_ACCESS_TOKEN_KEY, accessToken);
		}
	}

	public hasAccessToken(): boolean {
		return this.getAccessToken() !== undefined;
	}

	public getAccessToken(): string | undefined {
		if (browser) {
			return sessionStorage.getItem(LobbyService.LOBBY_MEMBER_ACCESS_TOKEN_KEY) ?? undefined;
		}
	}

	public addLobbyOwnerToLobby(lobby: Lobby): void {
		if (typeof lobby.owner === 'number') {
			const membersById = this.createIdToLobbyMemberMap(lobby.members ?? []);
			lobby.owner = membersById.get(lobby.owner) ?? lobby.owner;
		}
	}

	public createIdToLobbyMemberMap(members: LobbyMember[]): Map<number, LobbyMember> {
		return new Map(members.filter(this.hasId).map((members) => [members.id, members]));
	}
}

export const lobbyService: LobbyService = new LobbyService();
