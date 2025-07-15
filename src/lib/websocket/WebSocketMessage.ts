import type WebSocketData from './WebSocketData';
import type { WebSocketMessageType } from './WebSocketMessageType';

export default interface WebSocketMessage {
	messageType: WebSocketMessageType;
	destination?: string;
	payload: WebSocketData | string | undefined;
}
