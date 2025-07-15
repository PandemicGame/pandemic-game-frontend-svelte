import { writable } from 'svelte/store';
import type Game from './Game.type';
import Player from './player/Player.type';

export const currentGame = writable<Game | undefined>();

export const currentPlayer = writable<Player | undefined>();
