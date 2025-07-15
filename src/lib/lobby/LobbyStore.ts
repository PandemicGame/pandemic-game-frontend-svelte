import { writable } from 'svelte/store';
import Lobby from './Lobby.type';
import UserLobbyMember from './UserLobbyMember.type';

export const lobbyStore = writable<Lobby[]>([]);

export const currentLobby = writable<Lobby | undefined>();

export const currentLobbyMember = writable<UserLobbyMember | undefined>();
