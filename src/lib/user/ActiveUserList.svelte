<script lang="ts">
	import { onDestroy } from 'svelte';
	import NameableList from '../util/NameableList.svelte';
	import type User from './User.type';
	import { activeUsers } from './UserStore';

	let users: User[] = $state<User[]>([]);

	const unsubscribe = activeUsers.subscribe((u) => (users = u));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="grid h-full w-full grid-rows-[auto_1fr] overflow-hidden">
	<h2 class="text-xl font-bold">Active Users</h2>
	<NameableList nameables={users} />
</div>
