import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Effect extends WebSocketData {
	constructor(public id: number) {
		super();
	}
}
