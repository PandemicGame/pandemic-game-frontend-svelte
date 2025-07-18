import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Account extends WebSocketData {
	constructor(
		public firstName: string,
		public lastName: string,
		public username: string,
		public email: string,
		public issuer: string,
		public subject: string
	) {
		super();
	}
}
