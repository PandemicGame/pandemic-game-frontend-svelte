import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class BoardType extends WebSocketData {
	constructor(
		public id: number,
		public name: string
	) {
		super();
	}
}
