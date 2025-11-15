import type Color from '$lib/util/Color.type';
import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Card extends WebSocketData {
	constructor(
		public title: string,
		public color: Color
	) {
		super();
	}
}
