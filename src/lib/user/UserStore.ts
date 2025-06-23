import { writable } from 'svelte/store';
import type User from './User';

export const userStore = writable<User | undefined>();
