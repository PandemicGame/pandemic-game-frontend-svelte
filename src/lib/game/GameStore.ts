import { writable } from 'svelte/store';
import type Game from './Game.type';

export const currentGame = writable<Game | undefined>();
