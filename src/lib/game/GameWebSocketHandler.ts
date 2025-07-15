import { goto } from '$app/navigation';
import WebSocketHandler from '$lib/websocket/WebSocketHandler';
import Game from './Game.type';
import { currentGame } from './GameStore';

class GameWebSocketHandler extends WebSocketHandler {
	public handle(data: unknown): void {
		if (data instanceof Game) {
			currentGame.set(data);
			goto('/game');
		}
	}
}

export const gameWebSocketHandler: GameWebSocketHandler = new GameWebSocketHandler();
