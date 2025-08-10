import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Turn extends WebSocketData {
	constructor(public player: number) {
		super();
	}
}
