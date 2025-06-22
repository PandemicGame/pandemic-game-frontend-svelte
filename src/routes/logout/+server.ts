import { authJsSessionToken } from '../../auth.server';
import config from '../../config/config';
import { redirectToLogin } from '../../permission.server';

export const GET = async ({ cookies }) => {
	const path = config.userAuthTokenCookieOptions.path;
	const cookieOptions = { path };

	cookies.delete(config.userAuthTokenCookieKey, cookieOptions);
	cookies.delete(authJsSessionToken, cookieOptions);

	redirectToLogin();
};
