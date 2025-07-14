import ChatMessageSender from '$lib/chat/ChatMessageSender.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class LobbyMember extends ChatMessageSender {
	lobby?: number;
}
