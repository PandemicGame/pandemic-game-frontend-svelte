import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Player extends WebSocketData {
	id?: number;
}
