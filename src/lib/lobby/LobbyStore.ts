import { writable } from 'svelte/store';
import Lobby from './Lobby.type';

export const currentLobby = writable<Lobby | undefined>();
