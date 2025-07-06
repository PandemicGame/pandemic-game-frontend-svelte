import { writable, type Writable } from 'svelte/store';
import type WebSocketData from './WebSocketData';
import type WebSocketHandler from './WebSocketHandler';
import { addTypeInfoPropertyRecursively, addTypeInfoRecursively } from './WebSocketMapper';
import type WebSocketMessage from './WebSocketMessage';
import { WebSocketMessageType } from './WebSocketMessageType';

export default abstract class WebSocketConnector {
	protected socket: WebSocket | null = null;
	protected url: string;
	protected accessToken: string;
	protected handlers: WebSocketHandler[] = [];
	public isConnected: Writable<boolean> = writable(false);

	constructor(url: string, accessToken: string) {
		this.url = url;
		this.accessToken = accessToken;
	}

	public connect(): void {
		if (this.socket) return;

		this.socket = new WebSocket(this.url);

		this.socket.addEventListener('open', () => {
			this.isConnected.set(true);
			console.log(`[WebSocket] Connected to ${this.url}`);
			this.sendAuth();
		});

		this.socket.addEventListener('message', (event) => {
			this.handleMessage(event.data);
		});

		this.socket.addEventListener('close', () => {
			this.clearSocket();
			console.log(`[WebSocket] Disconnected from ${this.url}`);
		});

		this.socket.addEventListener('error', (e) => {
			console.error(`[WebSocket] Error:`, e);
		});
	}

	public disconnect(): void {
		if (this.socket) {
			this.socket.close();
			this.clearSocket();
		}
	}

	protected clearSocket(): void {
		this.isConnected.set(false);
		this.socket = null;
	}

	protected send(data: WebSocketMessage): void {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(data));
		} else {
			console.warn('[WebSocket] Cannot send message, socket not open');
		}
	}

	protected sendAuth(): void {
		this.send({
			messageType: WebSocketMessageType.AUTH,
			payload: this.accessToken
		});
	}

	public sendMessage(destination: string, payload: WebSocketData): void {
		this.send({
			messageType: WebSocketMessageType.MESSAGE,
			destination: destination,
			payload: addTypeInfoPropertyRecursively(payload)
		});
	}

	protected handleMessage(data: string): void {
		try {
			const dataAsObject = JSON.parse(data);
			const dataAsObjectWithCorrectType = addTypeInfoRecursively(dataAsObject);
			this.delegateMessageToHandlers(dataAsObjectWithCorrectType);
		} catch (err) {
			console.error('[WebSocket] Failed to parse message:', err);
		}
	}

	protected delegateMessageToHandlers(message: WebSocketData): void {
		this.handlers.forEach((handler) => handler.handle(message));
	}

	public addHandler(handler: WebSocketHandler): void {
		this.handlers.push(handler);
	}
}
