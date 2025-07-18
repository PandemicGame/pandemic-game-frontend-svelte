import Service from '$lib/Service';
import type Field from './board/Field.type';

class GameService extends Service {
	public createIdToFieldMap(fields: Field[]): Map<number, Field> {
		return new Map<number, Field>(fields.map((field) => [field.id, field]));
	}
}

export const gameService: GameService = new GameService();
