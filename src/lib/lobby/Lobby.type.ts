import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import GameOptions from '../game/GameOptions.type';
import type LobbyMember from './LobbyMember.type';
import UserLobbyMember from './UserLobbyMember.type';

@TypeInfo()
export default class Lobby extends WebSocketData {
	constructor(
		public id: number,
		public name: string,
		public owner: number | UserLobbyMember,
		public members: LobbyMember[],
		public chat: number,
		public gameOptions: GameOptions
	) {
		super();
	}

	public getOwnerName(): string {
		if (this.owner instanceof UserLobbyMember) {
			return this.owner.name;
		}
		return '';
	}

	public isOwner(lobbyMember: LobbyMember): boolean {
		if (typeof this.owner === 'number') {
			return this.owner === lobbyMember.id;
		} else if (this.owner instanceof UserLobbyMember) {
			return this.owner.id === lobbyMember.id;
		} else {
			return false;
		}
	}
}
