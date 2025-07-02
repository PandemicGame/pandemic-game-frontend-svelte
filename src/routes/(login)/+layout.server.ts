import config from '$lib/config/config';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const accessToken = event.cookies.get(config.userAccessTokenCookieKey);

	if (accessToken) {
		throw redirect(303, '/');
	}

	return {};
};
