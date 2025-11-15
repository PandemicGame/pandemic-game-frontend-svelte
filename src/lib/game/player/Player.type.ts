import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';
import type Role from '../role/Role.type';

@TypeInfo()
export default class Player extends WebSocketData {
	constructor(
		public id: number,
		public name: string,
		public currentField: number,
		public role: Role
	) {
		super();
	}
}
