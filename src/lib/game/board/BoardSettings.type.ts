import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class BoardSettings extends WebSocketData {
	boardSlotRadius?: number;
	boardSlotLabelOffset?: number;
	maxZoom?: number;
	minZoom?: number;
	defaultZoom?: number;
	centerX?: number;
	centerY?: number;
	boundsXMin?: number;
	boundsXMax?: number;
	boundsYMin?: number;
	boundsYMax?: number;
}
