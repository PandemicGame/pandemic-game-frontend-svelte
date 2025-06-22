import { userService } from '$lib/services/UserService';
import { redirect } from '@sveltejs/kit';
import config from '../../../../config/config';

export const GET = async ({ locals, cookies }) => {
	const session = await locals.auth();
	const accessToken: string | undefined = session?.accessToken;

	if (accessToken) {
		const userAuthToken = await userService.getAccessTokenForRegisteredUser(accessToken);

		cookies.set(
			config.userAuthTokenCookieKey,
			userAuthToken,
			config.userAuthTokenCookieOptions
		);
	}

	throw redirect(303, '/');
};
