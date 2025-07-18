import type User from '$lib/user/User.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import LobbyMember from './LobbyMember.type';

@TypeInfo()
export default class UserLobbyMember extends LobbyMember {
	constructor(
		public id: number,
		public name: string,
		public lobby: number,
		public user: User
	) {
		super(id, name, lobby);
	}
}
