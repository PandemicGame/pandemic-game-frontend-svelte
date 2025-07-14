import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Account extends WebSocketData {
	firstName?: string;
	lastName?: string;
	username?: string;
	email?: string;
	issuer?: string;
	subject?: string;
}
