import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class PlagueColor extends WebSocketData {
	r?: number;
	g?: number;
	b?: number;
}
