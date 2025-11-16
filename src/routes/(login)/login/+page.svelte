<script lang="ts">
	import config from '$lib/config/config';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';

	let loginMethod = $state('anonymous');

	let username = $state('');

	async function submitAnonymousLoginForm(event: SubmitEvent) {
		event.preventDefault();

		const res = await fetch(`/login/anonymous?${config.usernameChoiceQueryParam}=${username}`);
		if (res.ok) {
			location.href = '/';
		}
	}
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<div class="h-80 w-lg rounded p-12 shadow-md">
		<Tabs value={loginMethod} onValueChange={(e) => (loginMethod = e.value)}>
			<Tabs.List>
				<Tabs.Trigger value="anonymous">Anonymous</Tabs.Trigger>
				<Tabs.Trigger value="authenticated">Authenticated</Tabs.Trigger>
				<Tabs.Indicator />
			</Tabs.List>
			<Tabs.Content value="anonymous">
				<form class="flex flex-col gap-2" onsubmit={submitAnonymousLoginForm}>
					<label class="label">
						<span class="label-text">Username</span>
						<input class="input" type="text" bind:value={username} required />
					</label>
					<div>
						<button type="submit" class="btn preset-filled-primary-500">
							Choose username
						</button>
					</div>
				</form>
			</Tabs.Content>
			<Tabs.Content value="authenticated">
				<a
					href="/auth/signin"
					class="btn preset-filled-primary-500"
					data-sveltekit-preload-data="off">
					Sign in
				</a>
			</Tabs.Content>
		</Tabs>
	</div>
</div>
