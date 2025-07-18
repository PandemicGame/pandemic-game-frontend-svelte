import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type Lobby from './Lobby.type';

@TypeInfo()
export default class LobbyAndAccessTokenHolder extends WebSocketData {
	constructor(
		public lobby: Lobby,
		public accessToken: string,
		public member: number
	) {
		super();
	}
}
