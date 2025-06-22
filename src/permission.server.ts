import { redirect, type Handle } from '@sveltejs/kit';

const loginPageUrl = '/login';

const pagePrefixesWithoutRequiredLogin = [loginPageUrl, '/auth'];

function isLoginRequired(page: string): boolean {
	return !pagePrefixesWithoutRequiredLogin.some((p) => page.startsWith(p));
}

export const permissionEvaluatorHandle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();

	if (!session && isLoginRequired(event.url.pathname)) {
		throw redirect(303, loginPageUrl);
	}

	return resolve(event);
};
