import { lobbyWebSocketConnector } from '$lib/lobby/LobbyWebSocketConnector';
import ChatService from './ChatService';

class LobbyChatService extends ChatService {
	constructor() {
		super(lobbyWebSocketConnector);
	}
}

export const lobbyChatService: LobbyChatService = new LobbyChatService();
