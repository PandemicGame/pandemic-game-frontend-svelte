import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import Action from '../Action.type';
import type MoveActionEffect from '../effects/MoveActionEffect.type';

@TypeInfo()
export default class MoveAction extends Action {
	constructor(public availableEffects: MoveActionEffect[]) {
		super(availableEffects);
	}
}
