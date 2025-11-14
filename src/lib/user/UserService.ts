import { goto } from '$app/navigation';
import Service from '$lib/Service';
import type User from './User.type';

class UserService extends Service {
	public async getUserInfo(accessToken: string): Promise<User> {
		const res = await fetch(`${this.apiUrl}/user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: accessToken
		});

		if (res.status === 404) {
			goto('/logout');
		}

		if (!res.ok) {
			throw new Error(`HTTP error ${res.status}`);
		}

		return res.json() as Promise<User>;
	}
}

export const userService: UserService = new UserService();
