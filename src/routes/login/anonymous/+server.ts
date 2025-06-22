import { userService } from '$lib/services/UserService';
import config from '../../../config/config';

export const GET = async ({ url, cookies }) => {
	const username: string | null = url.searchParams.get(config.usernameChoiceQueryParam);

	if (!username) {
		return new Response('Username may not be empty.', {
			status: 400
		});
	}

	const userAuthToken = await userService.getAccessTokenForGuestUser(username);

	cookies.set(config.userAuthTokenCookieKey, userAuthToken, config.userAuthTokenCookieOptions);

	return new Response(userAuthToken);
};
