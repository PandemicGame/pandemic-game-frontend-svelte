import config from '../../config/config';

class UserService {
	private readonly apiUrl: string = config.apiUrl;

	public async getAccessTokenForRegisteredUser(accessToken: string): Promise<string> {
		const res = await fetch(`${this.apiUrl}/user/access-token/oauth2`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		return await res.text();
	}

	public async getAccessTokenForGuestUser(username: string): Promise<string> {
		const res = await fetch(`${this.apiUrl}/user/access-token?username=${username}`);
		return await res.text();
	}
}

export const userService: UserService = new UserService();
