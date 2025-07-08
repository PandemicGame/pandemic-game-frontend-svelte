import Service from '$lib/Service';
import type User from './User.type';

class UserService extends Service {
	private readonly throwError = () => {
		throw new Error('An error occured while fetching user info.');
	};

	public async getUserInfo(accessToken: string): Promise<User> {
		return this.fetchJson<User>(
			`${this.apiUrl}/user`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(accessToken)
			},
			this.throwError,
			this.throwError
		);
	}
}

export const userService: UserService = new UserService();
