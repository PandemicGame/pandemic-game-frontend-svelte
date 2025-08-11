import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type MoveActionEffect from '../../effects/MoveActionEffect.type';
import MoveAction from '../MoveAction.type';

@TypeInfo()
export default class CarAction extends MoveAction {
	constructor(public availableEffects: MoveActionEffect[]) {
		super(availableEffects);
	}
}
