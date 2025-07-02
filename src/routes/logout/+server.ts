import config from '$lib/config/config';
import { userService } from '$lib/user/UserService.server';
import { authJsSessionToken } from '../../auth.server';
import { redirectToLogin } from '../../permission.server';

export const GET = async ({ cookies }) => {
	const path = config.userAccessTokenCookieOptions.path;
	const cookieOptions = { path };

	userService.deleteAccessTokenInCookie(cookies);
	cookies.delete(authJsSessionToken, cookieOptions);

	redirectToLogin();
};
