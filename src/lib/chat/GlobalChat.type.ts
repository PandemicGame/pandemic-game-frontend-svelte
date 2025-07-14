import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import Chat from './Chat.type';

@TypeInfo()
export default class GlobalChat extends Chat {
	public static readonly GLOBAL_CHAT_IDENTIFIER = 'GLOBAL';
}
