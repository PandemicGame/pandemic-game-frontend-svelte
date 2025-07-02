import { userService } from '$lib/user/UserService.server';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const accessToken = userService.getAccessTokenFromCookie(event.cookies);

	if (accessToken) {
		throw redirect(303, '/');
	}

	return {};
};
