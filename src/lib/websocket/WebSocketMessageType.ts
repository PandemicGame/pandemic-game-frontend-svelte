export const WebSocketMessageType = {
	AUTH: 'AUTH',
	MESSAGE: 'MESSAGE'
} as const;

export type WebSocketMessageType = (typeof WebSocketMessageType)[keyof typeof WebSocketMessageType];
