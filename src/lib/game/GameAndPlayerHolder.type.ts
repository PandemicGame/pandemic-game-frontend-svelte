import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type Game from './Game.type';

@TypeInfo()
export default class GameAndPlayerHolder extends WebSocketData {
	constructor(
		public game: Game,
		public player: number
	) {
		super();
	}
}
