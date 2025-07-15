import type Lobby from '$lib/lobby/Lobby.type';
import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type Board from './board/Board.type';
import type Player from './player/Player.type';

@TypeInfo()
export default class Game extends WebSocketData {
	id?: number;
	lobby?: Lobby;
	playersInTurnOrder?: Player[];
	board?: Board;
}
