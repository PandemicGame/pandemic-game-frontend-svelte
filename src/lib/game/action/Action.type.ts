import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type ActionEffect from './effects/ActionEffect.type';

@TypeInfo()
export default class Action extends WebSocketData {
	constructor(public availableEffects: ActionEffect[]) {
		super();
	}
}
