import type Account from '$lib/auth/Account.type';
import ChatMessageSender from '$lib/chat/ChatMessageSender.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class User extends ChatMessageSender {
	constructor(
		public id: number,
		public name: string,
		public account: Account | null
	) {
		super(id, name);
	}
}
