import type Lobby from '$lib/lobby/Lobby.type';
import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Game extends WebSocketData {
	id?: number;
	lobby?: Lobby;
}
