import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type MoveActionEffect from '../../effects/MoveActionEffect.type';
import CarAction from './CarAction.type';

@TypeInfo()
export default class CarActionForAlly extends CarAction {
	constructor(public availableEffects: MoveActionEffect[]) {
		super(availableEffects);
	}
}
