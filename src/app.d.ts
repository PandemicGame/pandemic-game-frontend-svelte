// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Session {
			user: {
				name: string;
				email: string;
				username: string;
			};
			expires: string | Date;
			accessToken: string;
		}
		interface LayoutData {
			session: Session;
			userAccessToken: string;
		}
	}
}

export {};
