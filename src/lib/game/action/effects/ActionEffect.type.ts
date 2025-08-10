import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class ActionEffect extends WebSocketData {
	constructor(public id: number) {
		super();
	}
}
