import Effect from '$lib/game/effect/Effect.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class ActionEffect extends Effect {
	constructor(public id: number) {
		super(id);
	}
}
