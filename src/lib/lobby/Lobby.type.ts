import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import GameOptions from '../game/GameOptions.type';
import type LobbyMember from './LobbyMember.type';
import UserLobbyMember from './UserLobbyMember.type';

@TypeInfo()
export default class Lobby extends WebSocketData {
	id?: number;
	name?: string;
	owner?: number | UserLobbyMember;
	members?: LobbyMember[];
	chat?: number;
	gameOptions?: GameOptions;

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
