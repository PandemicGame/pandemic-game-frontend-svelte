import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type ChatMessage from './ChatMessage.type';
import type ChatMessageSender from './ChatMessageSender.type';

@TypeInfo('Chat')
export default class Chat extends WebSocketData {
	id?: number;
	members?: ChatMessageSender[];
	messages?: ChatMessage[];
}
