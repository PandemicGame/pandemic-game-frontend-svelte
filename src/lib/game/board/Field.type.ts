import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Field extends WebSocketData {
	constructor(
		public id: number,
		public name: string,
		public xcoordinate: number,
		public ycoordinate: number,
		public plagueCode: string,
		public connectionIds: number[]
	) {
		super();
	}
}
