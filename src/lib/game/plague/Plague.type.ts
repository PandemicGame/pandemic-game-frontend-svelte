import type Color from '$lib/util/Color.type';
import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Plague extends WebSocketData {
	constructor(
		public code: string,
		public name: string,
		public color: Color
	) {
		super();
	}
}
