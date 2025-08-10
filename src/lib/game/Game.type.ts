import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type Board from './board/Board.type';
import type Plague from './plague/Plague.type';
import type Player from './player/Player.type';

@TypeInfo()
export default class Game extends WebSocketData {
	constructor(
		public id: number,
		public lobbyId: number,
		public playersInTurnOrder: Player[],
		public board: Board,
		public plagues: Plague[]
	) {
		super();
	}

	public findPlagueForCode(code: string): Plague | undefined {
		return this.plagues.find((p) => p.code === code);
	}
}
