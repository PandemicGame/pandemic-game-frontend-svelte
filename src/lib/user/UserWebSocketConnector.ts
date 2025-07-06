import config from '$lib/config/config';
import WebSocketConnector from '$lib/websocket/WebSocketConnector';

class UserWebSocketConnector extends WebSocketConnector {
	constructor() {
		super(`${config.webSocketUrl}/user`);
	}
}

export const userWebSocketConnector: UserWebSocketConnector = new UserWebSocketConnector();
