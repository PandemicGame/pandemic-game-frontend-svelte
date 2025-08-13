import Service from '$lib/Service';
import { lobbyWebSocketConnector } from '$lib/lobby/LobbyWebSocketConnector';
import type ActionEffect from './action/effects/ActionEffect.type';
import type Field from './board/Field.type';

class GameService extends Service {
	public createIdToFieldMap(fields: Field[]): Map<number, Field> {
		return new Map<number, Field>(fields.map((field) => [field.id, field]));
	}

	public executeActionEffect(actionEffect: ActionEffect) {
		lobbyWebSocketConnector.sendMessage('/game/execute-action-effect', String(actionEffect.id));
	}
}

export const gameService: GameService = new GameService();
