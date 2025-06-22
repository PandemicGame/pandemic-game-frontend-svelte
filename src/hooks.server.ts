import type { Handle } from '@sveltejs/kit';
import { authHandle } from './auth.server';
import { permissionEvaluatorHandle } from './permission.server';

export const handle: Handle = async (input) => {
	return authHandle({
		...input,
		resolve: (event) => permissionEvaluatorHandle({ ...input, event, resolve: input.resolve })
	});
};
