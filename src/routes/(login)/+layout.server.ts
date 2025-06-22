import { redirect } from '@sveltejs/kit';
import config from '../../config/config';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const authToken = event.cookies.get(config.userAuthTokenCookieKey);

	if (authToken) {
		throw redirect(303, '/');
	}

	return {};
};
