import type Color from '$lib/util/Color.type';
import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Plague extends WebSocketData {
	code?: string;
	name?: string;
	color?: Color;
}
