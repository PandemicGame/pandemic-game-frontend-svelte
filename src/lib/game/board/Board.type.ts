import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type BoardSettings from './BoardSettings.type';
import type Field from './Field.type';

@TypeInfo()
export default class Board extends WebSocketData {
	id?: number;
	fields?: Field[];
	settings?: BoardSettings;
}
