import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Color extends WebSocketData {
	r?: number;
	g?: number;
	b?: number;

	public getCssValue(): string {
		return `rgb(${this.r}, ${this.g}, ${this.b})`;
	}
}
