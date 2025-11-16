import { writable } from 'svelte/store';
import Effect from './effect/Effect.type';
import type Game from './Game.type';
import Player from './player/Player.type';

export const currentGame = writable<Game | undefined>();

export const currentPlayer = writable<Player | undefined>();

export const effectToAnswer = writable<Effect | undefined>();
