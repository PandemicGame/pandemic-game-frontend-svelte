import ChatMessageSender from '$lib/chat/ChatMessageSender.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class LobbyMember extends ChatMessageSender {
	constructor(
		public id: number,
		public name: string,
		public lobby: number
	) {
		super(id, name);
	}
}
