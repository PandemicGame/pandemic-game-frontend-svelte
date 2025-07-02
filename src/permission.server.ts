import { userService } from '$lib/user/UserService.server';
import { redirect, type Handle } from '@sveltejs/kit';

const loginPageUrl = '/login';

const pagePrefixesWithoutRequiredLogin = [loginPageUrl, '/auth'];

function isLoginRequired(page: string): boolean {
	return !pagePrefixesWithoutRequiredLogin.some((p) => page.startsWith(p));
}

export function redirectToLogin(): never {
	throw redirect(303, loginPageUrl);
}

export const permissionEvaluatorHandle: Handle = async ({ event, resolve }) => {
	const hasToken = userService.hasAccessTokenAsCookie(event.cookies);

	if (!hasToken && isLoginRequired(event.url.pathname)) {
		redirectToLogin();
	}

	return resolve(event);
};
