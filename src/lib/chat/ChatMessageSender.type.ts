import type Nameable from '$lib/util/Nameable';
import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo('ChatMessageSender')
export default class ChatMessageSender extends WebSocketData implements Nameable {
	id?: number;
	name?: string;
}
