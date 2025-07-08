import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo('ChatMessageSender')
export default class ChatMessageSender extends WebSocketData {
	id?: number;
	name?: string;
}
