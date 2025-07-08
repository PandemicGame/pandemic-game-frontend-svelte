import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type LobbyMember from './LobbyMember.type';
import type UserLobbyMember from './UserLobbyMember.type';

@TypeInfo('Lobby')
export default class Lobby extends WebSocketData {
	id?: number;
	name?: string;
	owner?: UserLobbyMember;
	members?: LobbyMember[];
}
