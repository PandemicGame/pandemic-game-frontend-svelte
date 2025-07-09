import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type LobbyMember from './LobbyMember.type';
import UserLobbyMember from './UserLobbyMember.type';

@TypeInfo('Lobby')
export default class Lobby extends WebSocketData {
	id?: number;
	name?: string;
	owner?: number | UserLobbyMember;
	members?: LobbyMember[];
	chat?: number;

	public getOwnerName(): string {
		if (this.owner instanceof UserLobbyMember) {
			return this.owner.name ?? '';
		}
		return '';
	}
}
