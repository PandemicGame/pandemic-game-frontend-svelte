import WebSocketData from '$lib/websocket/WebSocketData';
import { TypeInfo } from '$lib/websocket/WebSocketMapper';

@TypeInfo()
export default class BoardSettings extends WebSocketData {
	constructor(
		public boardSlotRadius: number,
		public boardSlotLabelOffset: number,
		public maxZoom: number,
		public minZoom: number,
		public defaultZoom: number,
		public centerX: number,
		public centerY: number,
		public boundsXMin: number,
		public boundsXMax: number,
		public boundsYMin: number,
		public boundsYMax: number
	) {
		super();
	}
}
