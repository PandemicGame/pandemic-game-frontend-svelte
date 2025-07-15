import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type Field from './Field.type';

@TypeInfo()
export default class Board extends WebSocketData {
	id?: number;
	fields?: Field[];
}
