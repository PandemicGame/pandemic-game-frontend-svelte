import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type PlagueColor from './PlagueColor.type';

@TypeInfo()
export default class Plague extends WebSocketData {
	code?: string;
	name?: string;
	color?: PlagueColor;
}
