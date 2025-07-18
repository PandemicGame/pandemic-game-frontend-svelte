import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type ChatMessageSender from './ChatMessageSender.type';

@TypeInfo()
export default class ChatMessage extends WebSocketData {
	constructor(
		public id: number,
		public sender: ChatMessageSender | number,
		public chat: number,
		public message: string,
		public createdAt: string | Date
	) {
		super();
	}
}
