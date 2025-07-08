import { writable } from 'svelte/store';
import type User from './User.type';

export const userStore = writable<User | undefined>();

export const activeUsers = writable<User[]>([]);
