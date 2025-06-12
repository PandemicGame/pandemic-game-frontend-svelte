<script lang="ts">
	let { data } = $props();
	const session = data.session;
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<div class="w-lg rounded p-12 shadow-md">
		{#if session}
			<h1>You are logged in as: {session.user.username}.</h1>
			<a
				href="/auth/signout"
				class="rounded bg-red-500 px-2 py-1 font-bold text-white"
				data-sveltekit-preload-data="off">
				Sign out
			</a>
		{:else}
			<h1>You are not logged in.</h1>
			<a
				href="/auth/signin"
				class="rounded bg-blue-500 px-2 py-1 font-bold text-white"
				data-sveltekit-preload-data="off">
				Sign in
			</a>
		{/if}
	</div>
</div>
