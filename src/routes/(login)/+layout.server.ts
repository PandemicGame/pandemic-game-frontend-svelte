import config from '$lib/config/config';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const authToken = event.cookies.get(config.userAuthTokenCookieKey);

	if (authToken) {
		throw redirect(303, '/');
	}

	return {};
};
