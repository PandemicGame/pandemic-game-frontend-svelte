import { userService } from '$lib/user/UserService.server';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.auth(),
		userAccessToken: userService.getAccessTokenFromCookie(event.cookies)
	};
};
