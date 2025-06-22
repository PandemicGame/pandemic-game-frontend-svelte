import { redirect, type Handle } from '@sveltejs/kit';
import config from './config/config';

const loginPageUrl = '/login';

const pagePrefixesWithoutRequiredLogin = [loginPageUrl, '/auth'];

function isLoginRequired(page: string): boolean {
	return !pagePrefixesWithoutRequiredLogin.some((p) => page.startsWith(p));
}

export function redirectToLogin(): never {
	throw redirect(303, loginPageUrl);
}

export const permissionEvaluatorHandle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(config.userAuthTokenCookieKey);

	if (!token && isLoginRequired(event.url.pathname)) {
		redirectToLogin();
	}

	return resolve(event);
};
