import config from '$lib/config/config';

export default abstract class Service {
	protected readonly apiUrl: string = config.apiUrl;

	public async fetchJson<T>(
		url: string,
		options: RequestInit,
		httpErrorHandler: (res: Response) => Promise<never>,
		errorHandler: (err: unknown) => Promise<never>
	): Promise<T> {
		return this.fetch(url, options, httpErrorHandler, errorHandler, (res) => res.json());
	}

	public async fetchText(
		url: string,
		options: RequestInit,
		httpErrorHandler: (res: Response) => Promise<never>,
		errorHandler: (err: unknown) => Promise<never>
	): Promise<string> {
		return this.fetch(url, options, httpErrorHandler, errorHandler, (res) => res.text());
	}

	protected async fetch<T>(
		url: string,
		options: RequestInit,
		httpErrorHandler: (res: Response) => Promise<never>,
		errorHandler: (err: unknown) => Promise<never>,
		callback: (res: Response) => Promise<T>
	): Promise<T> {
		const response = await this.executeAsyncWithErrorHandler(
			() => fetch(url, options),
			errorHandler
		);
		if (response.status >= 400) {
			return await httpErrorHandler(response);
		}
		return await this.executeAsyncWithErrorHandler(() => callback(response), errorHandler);
	}

	protected async executeAsyncWithErrorHandler<T>(
		asyncContext: () => Promise<T>,
		errorHandler: (err: unknown) => Promise<never>
	): Promise<T> {
		try {
			return await asyncContext();
		} catch (error) {
			return await errorHandler(error);
		}
	}
}
