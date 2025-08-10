import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type Action from '../action/Action.type';

@TypeInfo()
export default class Turn extends WebSocketData {
	constructor(
		public player: number,
		public availableActions: Action[]
	) {
		super();
	}
}
