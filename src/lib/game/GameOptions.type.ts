import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type BoardType from './board/BoardType.type';

@TypeInfo()
export default class GameOptions extends WebSocketData {
	id?: number;
	availableBoardTypes?: BoardType[];
	selectedBoardTypeId?: number;
}
