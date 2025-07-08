import WebSocketHandler from '$lib/websocket/WebSocketHandler';
import User from './User.type';
import { activeUsers } from './UserStore';

class UserWebSocketHandler extends WebSocketHandler {
	public handle(data: unknown): void {
		if (Array.isArray(data)) {
			if (data.every((item) => item instanceof User)) {
				activeUsers.set(data);
			}
		}
	}
}

export const userWebSocketHandler: UserWebSocketHandler = new UserWebSocketHandler();
