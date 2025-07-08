import type Account from '$lib/auth/Account.type';
import ChatMessageSender from '$lib/chat/ChatMessageSender.type';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo('User')
export default class User extends ChatMessageSender {
	account?: Account;
}
