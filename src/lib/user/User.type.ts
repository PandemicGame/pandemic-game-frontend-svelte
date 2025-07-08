import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo('User')
export default class User extends WebSocketData {
	id?: number;
	name?: string;
}
