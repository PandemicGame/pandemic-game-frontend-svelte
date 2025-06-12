import { env } from '$env/dynamic/private';
import { SvelteKitAuth } from '@auth/sveltekit';
import config from './config/config.server';

export const { handle } = SvelteKitAuth({
	secret: env.AUTH_SECRET,
	trustHost: Boolean(env.AUTH_TRUST_HOST),
	providers: config.authProviders,
	callbacks: {
		async jwt({ token, profile, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			if (profile) {
				token.preferredUsername = profile.preferred_username;
			}
			return token;
		},
		async session({ session, token }) {
			const accessToken = token.accessToken;
			const username = token.preferredUsername;
			const user = { ...session.user, username };
			session.user = user;
			return { ...session, accessToken };
		}
	}
});
