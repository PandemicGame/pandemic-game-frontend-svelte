import { userService } from '$lib/user/UserService.server';

export const GET = async ({ locals, cookies }) => {
	const session = await locals.auth();
	const accessToken: string | undefined = session?.accessToken;

	return await userService.getAccessTokenForRegisteredUser(accessToken, cookies);
};
