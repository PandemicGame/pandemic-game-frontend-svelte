import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class BoardType extends WebSocketData {
	id?: number;
	name?: string;
}
