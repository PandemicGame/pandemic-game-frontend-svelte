import config from '$lib/config/config';
import { userService } from '$lib/user/UserService.server';

export const GET = async ({ url, cookies }) => {
	const username: string | null = url.searchParams.get(config.usernameChoiceQueryParam);

	return await userService.getAccessTokenForGuestUser(username, cookies);
};
