import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type Action from './action/Action.type';
import type Board from './board/Board.type';
import type Plague from './plague/Plague.type';
import type Player from './player/Player.type';
import type Turn from './turn/Turn.type';

@TypeInfo()
export default class Game extends WebSocketData {
	constructor(
		public id: number,
		public lobbyId: number,
		public playersInTurnOrder: Player[],
		public board: Board,
		public plagues: Plague[],
		public turns: Turn[]
	) {
		super();
	}

	public findPlagueForCode(code: string): Plague | undefined {
		return this.plagues.find((p) => p.code === code);
	}

	public getCurrentTurn(): Turn {
		return this.turns[this.turns.length - 1];
	}

	public getAvailableActions(): Action[] {
		return this.getCurrentTurn().availableActions;
	}
}
