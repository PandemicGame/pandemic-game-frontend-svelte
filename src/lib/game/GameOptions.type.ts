import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type BoardType from './board/BoardType.type';

@TypeInfo()
export default class GameOptions extends WebSocketData {
	constructor(
		public id: number,
		public availableBoardTypes: BoardType[],
		public selectedBoardTypeId: number
	) {
		super();
	}
}
