import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type ChatMessageSender from './ChatMessageSender.type';

@TypeInfo('ChatMessage')
export default class ChatMessage extends WebSocketData {
	id?: number;
	sender?: ChatMessageSender | number;
	chat?: number;
	message?: string;
	createdAt?: string | Date;
}
