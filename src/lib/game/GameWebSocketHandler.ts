import { goto } from '$app/navigation';
import WebSocketHandler from '$lib/websocket/WebSocketHandler';
import GameAndPlayerHolder from './GameAndPlayerHolder.type';
import { currentGame, currentPlayer } from './GameStore';

class GameWebSocketHandler extends WebSocketHandler {
	public handle(data: unknown): void {
		if (data instanceof GameAndPlayerHolder) {
			currentGame.set(data.game);
			currentPlayer.set(data.game?.playersInTurnOrder?.find((p) => p.id === data.player));
			goto('/game');
		}
	}
}

export const gameWebSocketHandler: GameWebSocketHandler = new GameWebSocketHandler();
