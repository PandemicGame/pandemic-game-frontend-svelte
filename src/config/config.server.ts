import { env } from '$env/dynamic/private';
import type { Provider } from '@auth/core/providers';
import dev from './config.server.dev';
import prod from './config.server.prod';

export interface Config {
	authProviders: Provider[];
}

export function getRedirectUrl(provider: string): string {
	return `${env.ORIGIN}/auth/callback/${provider}`;
}

const isDev = import.meta.env.DEV && !import.meta.env.PROD;
export default isDev ? dev : prod;
