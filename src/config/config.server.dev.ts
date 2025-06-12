import { env } from '$env/dynamic/private';
import { getRedirectUrl, type Config } from './config.server';

export default {
	authProviders: [
		{
			id: 'keycloak-1',
			name: 'Keycloak 1',
			type: 'oidc',
			clientId: env.KEYCLOAK_1_ID,
			clientSecret: env.KEYCLOAK_1_SECRET,
			issuer: env.KEYCLOAK_1_ISSUER,
			redirectProxyUrl: getRedirectUrl('keycloak-1')
		},
		{
			id: 'keycloak-2',
			name: 'Keycloak 2',
			type: 'oidc',
			clientId: env.KEYCLOAK_2_ID,
			clientSecret: env.KEYCLOAK_2_SECRET,
			issuer: env.KEYCLOAK_2_ISSUER,
			redirectProxyUrl: getRedirectUrl('keycloak-2')
		}
	]
} as Config;
