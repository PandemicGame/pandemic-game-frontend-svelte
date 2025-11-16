import Service from '$lib/Service';
import { lobbyWebSocketConnector } from '$lib/lobby/LobbyWebSocketConnector';
import type Game from './Game.type';
import type Field from './board/Field.type';
import type Effect from './effect/Effect.type';
import type Player from './player/Player.type';

class GameService extends Service {
	public createIdToFieldMap(fields: Field[]): Map<number, Field> {
		return new Map<number, Field>(fields.map((field) => [field.id, field]));
	}

	public executeEffect(effect: Effect) {
		lobbyWebSocketConnector.sendMessage('/game/execute-effect', String(effect.id));
	}

	public approveEffect(effect: Effect) {
		lobbyWebSocketConnector.sendMessage('/game/approve-effect', String(effect.id));
	}

	public rejectEffect(effect: Effect) {
		lobbyWebSocketConnector.sendMessage('/game/reject-effect', String(effect.id));
	}

	public canPlayerExecuteActions(player: Player, game: Game): boolean {
		return game.getCurrentTurn().player === player?.id;
	}
}

export const gameService: GameService = new GameService();
