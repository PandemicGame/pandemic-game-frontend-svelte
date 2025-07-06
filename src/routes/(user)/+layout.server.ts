import { userService } from '$lib/user/UserService.server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	userService.refreshAccessTokenCookie(event.cookies);

	return {
		session: await event.locals.auth(),
		userAccessToken: userService.getAccessTokenFromCookie(event.cookies)
	};
};
