import type Color from '$lib/util/Color.type';
import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Role extends WebSocketData {
	id?: number;
	name?: string;
	color?: Color;
}
