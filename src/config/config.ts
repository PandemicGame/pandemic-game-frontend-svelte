import { env } from '$env/dynamic/public';

export default {
	apiUrl: env.PUBLIC_API_URL,
	usernameChoiceQueryParam: 'username',
	userAuthTokenCookieKey: 'userAuthToken',
	userAuthTokenCookieOptions: {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax' as const,
		maxAge: 60 * 60 * 24
	}
};
