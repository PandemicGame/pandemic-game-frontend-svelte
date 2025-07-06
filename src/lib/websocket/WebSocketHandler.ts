import type WebSocketData from './WebSocketData';

export default abstract class WebSocketHandler {
	public abstract handle(data: WebSocketData): void;
}
