import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type Role from '../role/Role.type';

@TypeInfo()
export default class Player extends WebSocketData {
	id?: number;
	currentField?: number;
	role?: Role;
}
