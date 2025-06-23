import { env } from '$env/dynamic/private';
import config from '$lib/config/config.server';
import { SvelteKitAuth } from '@auth/sveltekit';
import type { Handle } from '@sveltejs/kit';

export const authJsSessionToken = 'authjs.session-token';

const { handle } = SvelteKitAuth({
	secret: env.AUTH_SECRET,
	trustHost: Boolean(env.AUTH_TRUST_HOST),
	providers: config.authProviders,
	callbacks: {
		async jwt({ token, profile, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			if (profile) {
				token.username = profile.preferred_username ?? profile.username;
			}
			return token;
		},
		async session({ session, token }) {
			const accessToken = token.accessToken;
			const username = token.username;
			const user = { ...session.user, username };
			session.user = user;
			return { ...session, accessToken };
		},
		async redirect({ baseUrl }) {
			return `${baseUrl}/login/authenticated`;
		}
	}
});

export const authHandle: Handle = handle;
