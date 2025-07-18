import type Color from '$lib/util/Color.type';
import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Role extends WebSocketData {
	constructor(
		public id: number,
		public name: string,
		public color: Color
	) {
		super();
	}
}
