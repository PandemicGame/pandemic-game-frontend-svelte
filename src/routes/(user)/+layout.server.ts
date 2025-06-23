import config from '$lib/config/config';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.auth(),
		userAccessToken: event.cookies.get(config.userAuthTokenCookieKey)
	};
};
