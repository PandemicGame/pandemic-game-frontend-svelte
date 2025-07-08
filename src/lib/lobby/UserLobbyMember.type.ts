import type User from '$lib/user/User.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import LobbyMember from './LobbyMember.type';

@TypeInfo('UserLobbyMember')
export default class UserLobbyMember extends LobbyMember {
	user?: User;
}
