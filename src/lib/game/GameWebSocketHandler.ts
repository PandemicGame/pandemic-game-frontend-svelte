import { goto } from '$app/navigation';
import WebSocketHandler from '$lib/websocket/WebSocketHandler';
import Effect from './effect/Effect.type';
import Game from './Game.type';
import GameAndPlayerHolder from './GameAndPlayerHolder.type';
import { currentGame, currentPlayer, effectToAnswer } from './GameStore';

class GameWebSocketHandler extends WebSocketHandler {
	public handle(data: unknown): void {
		if (data instanceof GameAndPlayerHolder) {
			currentGame.set(data.game);
			currentPlayer.set(data.game.playersInTurnOrder.find((p) => p.id === data.player));
			goto('/game');
		} else if (data instanceof Game) {
			currentGame.set(data);
		} else if (data instanceof Effect) {
			effectToAnswer.set(data);
		}
	}
}

export const gameWebSocketHandler: GameWebSocketHandler = new GameWebSocketHandler();
