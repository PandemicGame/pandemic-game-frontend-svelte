import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class Field extends WebSocketData {
	id?: number;
	name?: string;
	xcoordinate?: number;
	ycoordinate?: number;
	plagueCode?: string;
	connectionIds?: number[];

	public hasCoordinates(): boolean {
		return this.xcoordinate !== undefined && this.ycoordinate !== undefined;
	}
}
