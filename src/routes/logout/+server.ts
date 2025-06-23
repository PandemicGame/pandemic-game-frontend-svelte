import config from '$lib/config/config';
import { authJsSessionToken } from '../../auth.server';
import { redirectToLogin } from '../../permission.server';

export const GET = async ({ cookies }) => {
	const path = config.userAuthTokenCookieOptions.path;
	const cookieOptions = { path };

	cookies.delete(config.userAuthTokenCookieKey, cookieOptions);
	cookies.delete(authJsSessionToken, cookieOptions);

	redirectToLogin();
};
