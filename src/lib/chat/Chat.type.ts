import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type ChatMessage from './ChatMessage.type';
import type ChatMessageSender from './ChatMessageSender.type';

@TypeInfo()
export default class Chat extends WebSocketData {
	constructor(
		public id: number,
		public members: ChatMessageSender[],
		public messages: ChatMessage[]
	) {
		super();
	}
}
