import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Color extends WebSocketData {
	constructor(
		public r: number,
		public g: number,
		public b: number
	) {
		super();
	}

	public getCssValue(): string {
		return `rgb(${this.r}, ${this.g}, ${this.b})`;
	}
}
