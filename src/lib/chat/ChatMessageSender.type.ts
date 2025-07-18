import type Nameable from '$lib/util/Nameable';
import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class ChatMessageSender extends WebSocketData implements Nameable {
	constructor(
		public id: number,
		public name: string
	) {
		super();
	}
}
