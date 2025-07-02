import config from '$lib/config/config';
import Service from '$lib/Service';
import { error, redirect, type Cookies } from '@sveltejs/kit';

class UserService extends Service {
	protected readonly errorResponseCallback: (message: string, statusCode: number) => never = (
		message,
		statusCode
	) => {
		throw error(statusCode, message);
	};

	protected readonly httpResponseCopyCallback: (res: Response) => Promise<never> = async (
		res
	) => {
		const text = await res.text();
		return this.errorResponseCallback(text, res.status);
	};

	protected readonly internalServerErrorCallback: () => never = () =>
		this.errorResponseCallback('An error occured.', 500);

	private readonly emptyUsernameErrorCallback: () => never = () => {
		return this.errorResponseCallback('Username may not be empty.', 400);
	};

	private readonly httpErrorCallback: (res: Response) => Promise<never> = async (res) => {
		if (res.status === 400) {
			return this.emptyUsernameErrorCallback();
		} else {
			return this.httpResponseCopyCallback(res);
		}
	};

	public async getAccessTokenForRegisteredUser(
		accessTokenOAuth2: string | undefined,
		cookies: Cookies
	): Promise<Response> {
		const redirectHome = () => {
			throw redirect(303, '/');
		};

		if (accessTokenOAuth2) {
			const accessToken = await this.fetchText(
				`${this.apiUrl}/user/access-token/oauth2`,
				{
					headers: {
						Authorization: `Bearer ${accessTokenOAuth2}`
					}
				},
				redirectHome,
				redirectHome
			);
			this.setAccessTokenAsCookie(accessToken, cookies);
		}

		return redirectHome();
	}

	public async getAccessTokenForGuestUser(
		username: string | null,
		cookies: Cookies
	): Promise<Response> {
		if (!username) {
			return this.emptyUsernameErrorCallback();
		}

		const accessToken = await this.fetchText(
			`${this.apiUrl}/user/access-token?username=${username}`,
			{},
			this.httpErrorCallback,
			this.internalServerErrorCallback
		);
		this.setAccessTokenAsCookie(accessToken, cookies);
		return new Response(accessToken);
	}

	private setAccessTokenAsCookie(accessToken: string, cookies: Cookies): void {
		cookies.set(
			config.userAccessTokenCookieKey,
			accessToken,
			config.userAccessTokenCookieOptions
		);
	}

	public hasAccessTokenAsCookie(cookies: Cookies): boolean {
		return cookies.get(config.userAccessTokenCookieKey) !== undefined;
	}

	public getAccessTokenFromCookie(cookies: Cookies): string {
		return cookies.get(config.userAccessTokenCookieKey) ?? '';
	}

	public refreshAccessTokenCookie(cookies: Cookies): void {
		const accessToken = this.getAccessTokenFromCookie(cookies);
		if (accessToken) {
			this.setAccessTokenAsCookie(accessToken, cookies);
		}
	}

	public deleteAccessTokeninCookie(cookies: Cookies): void {
		cookies.delete(config.userAccessTokenCookieKey, config.userAccessTokenCookieOptions);
	}
}

export const userService: UserService = new UserService();
